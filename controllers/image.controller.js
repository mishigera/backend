const { Jimp } = require("jimp");
const path = require('path');
const Image = require('../models/image.model');

exports.uploadImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;
    console.log(file)
    if (!file) {
      return res.status(400).json({ error: 'No se envió ningún archivo' });
    }

    const effects = JSON.parse(req.body.effects || '[]');
    const width = parseInt(req.body.resizeWidth, 10) || 300;
    const height = parseInt(req.body.resizeHeight, 10) || 300;

    const originalPath = file.path;
    const processedFileName = file.filename.replace(/\.(jpg|jpeg|png)$/, '_processed.jpg');
    const processedPath = path.join('uploads/processed', processedFileName);

    const image = await Jimp.read(originalPath);
    const appliedEffects = [];

    // Aplicar efectos condicionales
    if (effects.includes('resize')) {
      image.resize({w:width, h:height});
      appliedEffects.push(`resize:${width}x${height}`);
    }

    if (effects.includes('greyscale')) {
      image.greyscale();
      appliedEffects.push('greyscale');
    }

    if (effects.includes('quality')) {
      image.fisheye();
      appliedEffects.push('fiasheye');
    }

    await image.write(processedPath);

    const savedImage = await Image.create({
      userId,
      originalName: file.originalname,
      originalPath,
      processedPath,
      transformations: appliedEffects
    });

    res.status(201).json({
      message: 'Imagen subida y procesada exitosamente',
      data: savedImage
    });
  } catch (err) {
    console.error('Error al procesar la imagen:', err);
    res.status(500).json({ error: 'Error al procesar la imagen' });
  }
};

exports.getUserImages = async (req, res) => {
  try {
    const userId = req.user.id;
    const images = await Image.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (err) {
    console.error('Error al obtener imágenes:', err);
    res.status(500).json({ error: 'Error al obtener imágenes' });
  }
};

const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Usuario ya registrado' });

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error en el registro', details: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    console.error(err,'hbouinjokbgvfcvgbuhinjvgicyfgbuhinjgvcfutvygbuhinobvgicfvygbuhoibgvcfdxtfvygiubho gvicfuvygub hofcutxdfyv guigfuctdxc fygvuivcfuxdtfvygubicf7fvygbuvicfvgubivcf');
    res.status(500).json({ error: 'Error en el login', details: err.message });
  }
};

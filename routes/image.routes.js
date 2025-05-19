const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const verifyToken = require('../middleware/auth.middleware');
const imageController = require('../controllers/image.controller');

router.post(
    '/upload',
    verifyToken,
    (req, res, next) => {
      upload.single('image')(req, res, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        next();
      });
    },
    imageController.uploadImage
  );
  
router.get('/', verifyToken, imageController.getUserImages);

module.exports = router;

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const verifyToken = require('../middleware/auth.middleware');
const imageController = require('../controllers/image.controller');

router.post('/upload', verifyToken, upload.single('image'), imageController.uploadImage);

router.get('/', verifyToken, imageController.getUserImages);

module.exports = router;

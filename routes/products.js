const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
}).single('image');

router.post('/products', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file.' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file selected.' });
    }
    const imageData = { path: req.file.path };
    fs.writeFileSync('uploads/images.json', JSON.stringify(imageData, null, 2), 'utf-8');
    res.status(200).json({ message: 'File uploaded successfully.', filePath: req.file.path });
  });
});

router.get('/images', (req, res) => {
  const images = JSON.parse(fs.readFileSync('uploads/images.json', 'utf-8'));
  res.json(images);
});

module.exports = router;


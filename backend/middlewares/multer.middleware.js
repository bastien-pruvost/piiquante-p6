const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getRandomBetween } = require('../utils');

// Setup file name and destination folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const newFilename = `${Date.now()}-${getRandomBetween(1000, 9999)}${extension}`;
    cb(null, newFilename);
  },
});

// Setup accepted filetypes and filesize limit
const acceptedMimetypes = ['image/png', 'image/jpg', 'image/jpeg'];
const limits = {
  fileSize: 2097152,
};

// Middleware to store a single image
exports.uploadSauceImage = (req, res, next) => {
  multer({ storage, limits }).single('image')(req, res, (err) => {
    if (err && err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: `L'image doit être envoyée dans un champ de formulaire nommée 'image'` });
    }
    if (err && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: `L'image est trop lourde veuillez ne pas depasser 2Mo` });
    }
    if (req.file && !acceptedMimetypes.includes(req.file.mimetype)) {
      fs.unlink(`public/images/${req.file.filename}`, (error) => {
        if (error) console.log(error);
      });
      return res.status(400).json({ message: `L'image n'est pas au bon format. Formats accéptés : Png, Jpg, Jpeg` });
    }
    if (err) return res.status(500).json({ message: err.message });
    return next();
  });
};

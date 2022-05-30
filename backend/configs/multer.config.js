const multer = require('multer');
const path = require('path');

const getRandomBetween = (min, max) => Math.floor(Math.random() * (max - min) + min);

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

exports.uploadSingleImage = (req, res, next) => {
  multer({ storage }).single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    next();
  });
};

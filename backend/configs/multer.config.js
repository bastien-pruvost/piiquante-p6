const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

exports.uploadSingleImage = [
  (req, res, next) => {
    multer({ storage }).single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return next();
    });
  },
  (req, res, next) => {
    console.log(req.body);
    if (req.file && !req.body.sauce) {
      fs.unlinkSync(`public/images/${req.file.filename}`);
      return res.status(400).json({ message: `Il manque l'objet sauce dans la requête` });
    }
    if (req.body.sauce && !req.file) {
      return res.status(400).json({ message: `Il manque l'image dans la requête` });
    }
    return next();
  },
];

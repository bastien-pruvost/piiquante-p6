const multer = require('multer');
const path = require('path');

// Function to create a random integer in a range of two numbers (for images filename)
const getRandomBetween = (min, max) => Math.floor(Math.random() * (max - min) + min);

// Configure file name and destination folder for file storage with multer
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

// Middleware to store a single image
exports.uploadSauceImage = (req, res, next) => {
  multer({ storage }).single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ message: err });
    return next();
  });
};

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const sauceName = JSON.parse(req.body.sauce).name.split(' ').join('_').toLowerCase();
    const extension = path.extname(file.originalname);
    const newFilename = `${sauceName}-${Date.now()}${extension}`;
    cb(null, newFilename);
  },
});

exports.upload = multer({ storage });

const saucesQueries = require('../queries/users.queries');
const { upload } = require('../configs/multer.config');

exports.getAllSauces = async (req, res, next) => {
  res.status(200).json({ message: 'Route ok !' });
};

exports.getOneSauce = async (req, res, next) => {
  res.status(200).json({ message: 'Route ok !' });
};

exports.sauceCreate = [
  // Upload image
  upload.single('image'),
  // Create new sauce
  async (req, res, next) => {
    const imageUrl = `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`;
    res.status(200).json({ message: 'Route ok !' });
  },
];

exports.sauceModify = async (req, res, next) => {
  res.status(200).json({ message: 'Route ok !' });
};

exports.sauceDelete = async (req, res, next) => {
  res.status(200).json({ message: 'Route ok !' });
};

exports.sauceLike = async (req, res, next) => {
  res.status(200).json({ message: 'Route ok !' });
};

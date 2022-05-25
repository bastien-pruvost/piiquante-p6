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
  async (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
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

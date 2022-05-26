const path = require('path');
const { upload } = require('../configs/multer.config');
const saucesQueries = require('../queries/sauces.queries');

exports.getAllSauces = async (req, res, next) => {
  try {
    const allSauces = await saucesQueries.findAllSauces();
    res.status(200).json(allSauces);
  } catch (err) {
    res.status(404).json({ error: err.mesage });
  }
};

exports.getOneSauce = async (req, res, next) => {
  try {
    const sauceId = req.params.id;
    const sauce = await saucesQueries.findOneSauce(sauceId);
    res.status(200).json(sauce);
  } catch (err) {
    res.status(404).json({ error: err.mesage });
  }
};

exports.createSauce = [
  upload.single('image'), // Upload image before creating the sauce
  async (req, res, next) => {
    try {
      const sauceObject = JSON.parse(req.body.sauce);
      // const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      await saucesQueries.addSauce(sauceObject, imageUrl);
      res.status(201).json({ message: 'Sauce ajoutée avec succés.' });
    } catch (err) {
      res.status(400).json({ error: err.mesage });
    }
  },
];

exports.modifySauce = async (req, res, next) => {
  res.status(200).json({ message: 'Route ok !' });
};

exports.deleteSauce = async (req, res, next) => {
  res.status(200).json({ message: 'Route ok !' });
};

exports.likeSauce = async (req, res, next) => {
  res.status(200).json({ message: 'Route ok !' });
};

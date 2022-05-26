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
    const sauceObject = await saucesQueries.findSauceById(sauceId);
    res.status(200).json(sauceObject);
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
  try {
    const sauceId = req.params.id;
    const sauceObject = await saucesQueries.findSauceById(sauceId);
    const userId = req.user._id.toString();
    if (userId === sauceObject.userId) {
      await saucesQueries.deleteSauceById(sauceId);
      res.status(200).json({ message: 'Sauce supprimé avec succés' });
    } else {
      res.status(403).json({ error: `Vous n'êtes pas l'auteur de cette sauce` });
    }
  } catch (err) {
    res.status(404).json({ error: err.mesage });
  }
};

exports.likeSauce = async (req, res, next) => {
  res.status(200).json({ message: 'Route ok !' });
};

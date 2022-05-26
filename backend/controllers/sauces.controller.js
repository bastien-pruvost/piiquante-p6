const { upload } = require('../configs/multer.config');
const saucesQueries = require('../queries/sauces.queries');

exports.getAllSauces = async (req, res, next) => {
  try {
    const allSauces = await saucesQueries.findAllSauces();
    res.status(200).json(allSauces);
  } catch (err) {
    res.status(404).json({ message: err.mesage });
  }
};

exports.getOneSauce = async (req, res, next) => {
  try {
    const sauceId = req.params.id;
    const sauceObject = await saucesQueries.findSauceById(sauceId);
    res.status(200).json(sauceObject);
  } catch (err) {
    res.status(404).json({ message: err.mesage });
  }
};

exports.createSauce = [
  upload.single('image'), // Upload image before creating the sauce
  async (req, res, next) => {
    try {
      const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      const sauceObject = {
        ...JSON.parse(req.body.sauce),
        imageUrl,
      };
      await saucesQueries.addSauce(sauceObject);
      res.status(201).json({ message: 'Sauce ajoutée avec succés.' });
    } catch (err) {
      res.status(400).json({ message: err.mesage });
    }
  },
];

exports.modifySauce = [
  upload.single('image'), // Upload image before creating the sauce
  async (req, res, next) => {
    try {
      const sauceId = req.params.id;
      const updatedSauceObject = req.file
        ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          }
        : { ...req.body };
      await saucesQueries.updateSauceById(sauceId, updatedSauceObject);
      res.status(200).json({ message: 'Sauce modifiée avec succés' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
];

exports.deleteSauce = async (req, res, next) => {
  try {
    const sauceId = req.params.id;
    await saucesQueries.deleteSauceById(sauceId);
    res.status(200).json({ message: 'Sauce supprimée avec succés' });
  } catch (err) {
    res.status(400).json({ error: err.mesage });
  }
};

exports.likeSauce = async (req, res, next) => {
  res.status(200).json({ message: 'Route ok !' });
};

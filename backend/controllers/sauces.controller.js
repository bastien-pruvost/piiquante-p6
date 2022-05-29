const fs = require('fs');
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
      let updatedSauceObject = {};
      if (req.file) {
        const sauce = await saucesQueries.findSauceById(sauceId);
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlinkSync(`public/images/${filename}`);
        updatedSauceObject = {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        };
      } else {
        updatedSauceObject = { ...req.body };
      }
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
    const sauce = await saucesQueries.findSauceById(sauceId);
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlinkSync(`public/images/${filename}`);
    await saucesQueries.deleteSauceById(sauceId);
    res.status(200).json({ message: 'Sauce supprimée avec succés' });
  } catch (err) {
    res.status(400).json({ error: err.mesage });
  }
};

exports.likeSauce = async (req, res, next) => {
  try {
    const { body } = req;
    const likeRequest = body.like;
    const sauceId = req.params.id;
    const userId = req.user._id.toString();
    const sauceObject = await saucesQueries.findSauceById(sauceId);
    const userAlreadyLiked = sauceObject.usersLiked.includes(userId);
    const userAlreadyDisliked = sauceObject.usersDisliked.includes(userId);
    let updatedSauceObject = {};
    let message = '';

    if (likeRequest === 1 && !userAlreadyLiked) {
      updatedSauceObject = {
        $addToSet: { usersLiked: userId },
        $pull: { usersDisliked: userId },
        $inc: {
          likes: 1,
          dislikes: userAlreadyDisliked ? -1 : 0,
        },
      };
      message = `Vous avez liké la sauce ${sauceObject.name}`;
    } else if (likeRequest === -1 && !userAlreadyDisliked) {
      updatedSauceObject = {
        $addToSet: { usersDisliked: userId },
        $pull: { usersLiked: userId },
        $inc: {
          dislikes: 1,
          likes: userAlreadyLiked ? -1 : 0,
        },
      };
      message = `Vous avez disliké la sauce ${sauceObject.name}`;
    } else if (likeRequest === 0) {
      updatedSauceObject = {
        $pull: { usersLiked: userId, usersDisliked: userId },
        $inc: {
          likes: userAlreadyLiked ? -1 : 0,
          dislikes: userAlreadyDisliked ? -1 : 0,
        },
      };
      message = `Vous avez enlevé votre ${userAlreadyLiked ? 'like' : 'dislike'} de la sauce ${sauceObject.name}`;
    } else {
      res
        .status(400)
        .json({ message: `Vous avez déja ${userAlreadyLiked ? 'liké' : 'disliké'} la sauce ${sauceObject.name}` });
    }
    await saucesQueries.updateSauceById(sauceId, updatedSauceObject);
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: err.mesage });
  }
};

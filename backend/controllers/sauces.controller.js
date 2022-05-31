const fs = require('fs');
const saucesQueries = require('../queries/sauces.queries');

// Controller to retrieve all the sauces and send them in json
exports.getAllSauces = async (req, res) => {
  try {
    const allSauces = await saucesQueries.findAllSauces();
    res.status(200).json(allSauces);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Controller to retrieve one sauce and send it in json
exports.getOneSauce = async (req, res) => {
  try {
    const sauceId = req.params.id;
    const sauceObject = await saucesQueries.findSauceById(sauceId);
    res.status(200).json(sauceObject);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Controller to create a new sauce
exports.createSauce = async (req, res) => {
  try {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const sauceObject = {
      ...JSON.parse(req.body.sauce),
      imageUrl,
      userId: req.user._id,
    };
    await saucesQueries.addSauce(sauceObject);
    res.status(201).json({ message: 'Sauce ajoutée avec succés.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller to modify an existing sauce
exports.modifySauce = async (req, res) => {
  try {
    const sauceId = req.params.id;
    let updatedSauceObject = {};

    // Changes the updated sauce object depending on whether there is an image or not
    if (req.file) {
      const sauce = await saucesQueries.findSauceById(sauceId);
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlinkSync(`public/images/${filename}`);
      updatedSauceObject = {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: req.user._id,
      };
    } else {
      updatedSauceObject = { ...req.body, userId: req.user._id };
    }

    await saucesQueries.updateSauceById(sauceId, updatedSauceObject);
    res.status(200).json({ message: 'Sauce modifiée avec succés' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller to delete an existing sauce
exports.deleteSauce = async (req, res) => {
  try {
    const sauceId = req.params.id;
    const sauce = await saucesQueries.findSauceById(sauceId);
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlinkSync(`public/images/${filename}`);
    await saucesQueries.deleteSauceById(sauceId);
    res.status(200).json({ message: 'Sauce supprimée avec succés' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller to like or dislike a sauce (and verify if the user has not already liked or disliked)
exports.likeSauce = async (req, res) => {
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

    // Add a like
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

      // Add a dislike
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

      // Remove the like or dislike
    } else if (likeRequest === 0) {
      updatedSauceObject = {
        $pull: { usersLiked: userId, usersDisliked: userId },
        $inc: {
          likes: userAlreadyLiked ? -1 : 0,
          dislikes: userAlreadyDisliked ? -1 : 0,
        },
      };
      message = `Vous avez enlevé votre ${userAlreadyLiked ? 'like' : 'dislike'} de la sauce ${sauceObject.name}`;

      // Returns an error if the user has already liked or disliked this sauce
    } else {
      res
        .status(400)
        .json({ message: `Vous avez déja ${userAlreadyLiked ? 'liké' : 'disliké'} la sauce ${sauceObject.name}` });
    }
    await saucesQueries.updateSauceById(sauceId, updatedSauceObject);
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

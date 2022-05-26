const Sauce = require('../models/sauce.model');

exports.findAllSauces = () => Sauce.find({}).exec();

exports.findSauceById = (sauceId) => Sauce.findById(sauceId).exec();

exports.addSauce = (sauceObject, imageUrl) => {
  const newSauce = new Sauce({
    ...sauceObject,
    imageUrl,
  });
  return newSauce.save();
};

exports.deleteSauceById = (sauceId) => Sauce.findByIdAndDelete(sauceId).exec();

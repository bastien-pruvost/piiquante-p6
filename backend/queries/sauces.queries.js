const Sauce = require('../models/sauce.model');

exports.findAllSauces = () => Sauce.find({}).exec();

exports.findSauceById = (sauceId) => Sauce.findById(sauceId).exec();

exports.addSauce = (sauceObject) => {
  const newSauce = new Sauce({ ...sauceObject });
  return newSauce.save();
};

exports.updateSauceById = (sauceId, updatedSauceObject) =>
  Sauce.findByIdAndUpdate(sauceId, updatedSauceObject, { runValidators: true }).exec();

exports.deleteSauceById = (sauceId) => Sauce.findByIdAndDelete(sauceId).exec();

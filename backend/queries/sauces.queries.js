const Sauce = require('../models/sauce.model');

// Database query to find all sauces
exports.findAllSauces = () => Sauce.find({}).exec();

// Database query to find to find a sauce with its id
exports.findSauceById = (sauceId) => Sauce.findById(sauceId).exec();

// Database query to save a new sauce
exports.addSauce = (sauceObject) => {
  const newSauce = new Sauce({ ...sauceObject });
  return newSauce.save();
};

// Database query to update an existing sauce
exports.updateSauceById = (sauceId, updatedSauceObject) =>
  Sauce.findByIdAndUpdate(sauceId, updatedSauceObject, { runValidators: true }).exec();

// Database query to delete an existing sauce
exports.deleteSauceById = (sauceId) => Sauce.findByIdAndDelete(sauceId).exec();

const User = require('../models/user.model');

// Database query to save a new user
exports.createUser = (email, hashedPassword) => {
  const newUser = new User({ email, password: hashedPassword });
  return newUser.save();
};

// Database query to find a user with his email
exports.findUserByEmail = (email) => User.findOne({ email }).exec();

// Database query to find a user with his id
exports.findUserById = (id) => User.findOne({ _id: id }).exec();

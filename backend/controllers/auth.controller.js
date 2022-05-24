const User = require('../models/user.model');

exports.signup = (req, res, next) => {
  res.status(200).json({ message: 'signup route ok' });
};

exports.login = (req, res, next) => {
  res.status(200).json({ message: 'login route ok' });
};

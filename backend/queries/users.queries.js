const User = require('../models/user.model');
const argon2 = require('../configs/argon2.config');

exports.createUser = async (user) => {
  try {
    const hashedPassword = await argon2.hashPassword(user.password);
    const newUser = new User({
      email: user.email,
      password: hashedPassword,
    });
    return newUser.save();
  } catch (err) {
    throw new Error(`Error when create user in DB : ${err}`);
  }
};

exports.findUser = async (user) => {
  try {
    return User.findOne({ email: user.email }).exec();
  } catch (err) {
    throw new Error(`Error when finding user in DB : ${err}`);
  }
};

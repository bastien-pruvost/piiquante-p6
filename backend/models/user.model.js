const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schema of users for database
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Mongoose plugin to check that a data is unique (here for the users' email address)
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

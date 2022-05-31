const jwt = require('jsonwebtoken');

// Function to create a token that contains id of the user passed as argument
exports.createToken = (user) => jwt.sign({ userId: user._id.toString() }, process.env.JWT_KEY, { expiresIn: '24h' });

// Function to decode a token and retrieve the userId it contains
exports.verifyToken = (token) => jwt.verify(token, process.env.JWT_KEY);

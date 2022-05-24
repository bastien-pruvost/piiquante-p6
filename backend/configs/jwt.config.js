const jwt = require('jsonwebtoken');

exports.createToken = (user) => jwt.sign({ userId: user._id.toString() }, process.env.JWT_KEY, { expiresIn: '24h' });

exports.verifyToken = (token) => jwt.verify(token, process.env.JWT_KEY);

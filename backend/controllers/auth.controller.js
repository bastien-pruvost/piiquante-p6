const jwt = require('jsonwebtoken');
const argon = require('../utils/argon2.utils');
const usersQueries = require('../queries/users.queries');

// Controller to create a new user
exports.signup = async (req, res) => {
  try {
    const hashedPassword = await argon.hashPassword(req.body.password);
    await usersQueries.createUser(req.body.email, hashedPassword);
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to connect a user by creating a token
exports.login = async (req, res) => {
  try {
    const user = await usersQueries.findUserByEmail(req.body.email);
    if (!user) return res.status(401).json({ message: `Email ou mot de passe incorrect` });

    const passwordIsValid = await argon.verifyPassword(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).json({ message: `Email ou mot de passe incorrect` });

    return res.status(200).json({
      userId: user._id.toString(),
      token: jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET_KEY, { expiresIn: '6h' }),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

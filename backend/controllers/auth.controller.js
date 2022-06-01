const usersQueries = require('../queries/users.queries');
const argon = require('../configs/argon2.config');
const { createToken } = require('../configs/jwt.config');

// Controller to create a new user
exports.signup = async (req, res) => {
  try {
    await usersQueries.createUser(req.body);
    return res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Controller to connect a user by creating a token
exports.login = async (req, res) => {
  try {
    const user = await usersQueries.findUserByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({ message: `Email ou mot de passe incorrect` });
    }
    const passwordIsValid = await argon.verifyPassword(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: `Email ou mot de passe incorrect` });
    }
    return res.status(200).json({
      userId: user._id.toString(),
      token: createToken(user),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

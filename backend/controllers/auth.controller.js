const usersQueries = require('../queries/users.queries');
const argon2 = require('../configs/argon2.config');
const { createToken } = require('../configs/jwt.config');

exports.signup = async (req, res, next) => {
  try {
    await usersQueries.createUser(req.body);
    return res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await usersQueries.findUserByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    const passwordIsValid = await argon2.verifyPassword(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }
    return res.status(200).json({
      userId: user._id.toString(),
      token: createToken(user),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

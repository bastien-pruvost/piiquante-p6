const userQueries = require('../queries/users.queries');
const { verifyToken } = require('../configs/jwt.config');

exports.ensureAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token);
    const user = await userQueries.findUserById(decodedToken.userId);
    if (user) {
      req.user = user;
      req.isAuthenticated = true;
      next();
    } else {
      throw new Error(`Le token ne correspond à aucun utilisateur`);
    }
  } catch (err) {
    res.status(401).json({ error: new Error('Invalid request') });
  }
};

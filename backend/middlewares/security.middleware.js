const userQueries = require('../queries/users.queries');
const saucesQueries = require('../queries/sauces.queries');
const { verifyToken } = require('../configs/jwt.config');

// Middleware to ensure that the user is properly connected and add the user to the request object if he is connected
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
    res.status(401).json({ message: `Invalid request: ${err.message}` });
  }
};

// Middleware to ensure that the user is the owner of the sauce he tries to modify or delete
exports.ensureUserIsOwner = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const sauceId = req.params.id;
    const sauceObject = await saucesQueries.findSauceById(sauceId);
    if (userId === sauceObject.userId) {
      next();
    } else {
      res.status(403).json({ message: `Vous n'êtes pas l'auteur de cette sauce` });
    }
  } catch (err) {
    res.status(403).json({ message: `Invalid request: ${err.message}` });
  }
};

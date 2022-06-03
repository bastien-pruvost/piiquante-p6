const { verifyToken } = require('../configs/jwt.config');
const userQueries = require('../queries/users.queries');
const saucesQueries = require('../queries/sauces.queries');

// Middleware to ensure that the user is properly connected and add the user to the request object if he is connected
exports.ensureAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token);
    const user = await userQueries.findUserById(decodedToken.userId);
    if (!user) return res.status(401).json({ message: `Le token ne correspond à aucun utilisateur` });
    req.user = user;
    req.isAuthenticated = true;
    return next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Middleware to ensure that the user is the owner of the sauce he tries to modify or delete
exports.ensureUserIsOwner = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const sauceId = req.params.id;
    const sauceObject = await saucesQueries.findSauceById(sauceId);
    if (!sauceObject) return res.status(404).json({ message: `Cette sauce n'existe pas` });
    if (userId !== sauceObject.userId)
      return res.status(403).json({ message: `Vous n'êtes pas l'auteur de cette sauce` });
    return next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');
const { signupValidator } = require('../middlewares/validator.middleware');
const { rateLimiter } = require('../middlewares/limiter.middleware');

// --- ROUTERS /API/AUTH ---
router.post('/signup', rateLimiter, signupValidator, authCtrl.signup);
router.post('/login', rateLimiter, authCtrl.login);

module.exports = router;

const router = require('express').Router();
const { signupValidator } = require('../middlewares/validator.middleware');
const { loginLimiter } = require('../middlewares/limiter.middleware');
const authCtrl = require('../controllers/auth.controller');

// --- ROUTERS /API/AUTH ---
router.post('/signup', signupValidator, authCtrl.signup);
router.post('/login', loginLimiter, authCtrl.login);

module.exports = router;

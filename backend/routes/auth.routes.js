const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');
const { signupValidator } = require('../middlewares/validator.middleware');

// --- ROUTERS /API/AUTH ---
router.post('/signup', signupValidator, authCtrl.signup);
router.post('/login', authCtrl.login);

module.exports = router;

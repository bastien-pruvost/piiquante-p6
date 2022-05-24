const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');

// --- ROUTERS /API/AUTH ---
router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);

module.exports = router;

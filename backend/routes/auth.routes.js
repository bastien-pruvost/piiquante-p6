const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');

// --- AUTH ROUTERS ---
router.use('/signup', authCtrl.signup);
router.use('/login', authCtrl.login);

module.exports = router;

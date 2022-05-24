const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');

// --- AUTH ROUTERS ---
router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);

module.exports = router;

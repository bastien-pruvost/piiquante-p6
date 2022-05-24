const router = require('express').Router();
const authRoutes = require('./auth.routes');
const saucesRoutes = require('./sauces.routes');
const { ensureAuthenticated } = require('../middlewares/security.middleware');

// --- ROUTERS /API ---
router.use('/auth', authRoutes);
router.use('/sauces', saucesRoutes);

module.exports = router;

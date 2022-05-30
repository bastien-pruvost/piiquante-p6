const router = require('express').Router();
const authRoutes = require('./auth.routes');
const saucesRoutes = require('./sauces.routes');

// --- ROUTERS /API ---
router.use('/auth', authRoutes);
router.use('/sauces', saucesRoutes);

module.exports = router;

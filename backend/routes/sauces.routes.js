const router = require('express').Router();
const saucesCtrl = require('../controllers/sauces.controller');
const { ensureAuthenticated } = require('../middlewares/security.middleware');

// --- ROUTERS /API/SAUCES ---
router.get('/', ensureAuthenticated, saucesCtrl.getAllSauces);
router.get('/:id', ensureAuthenticated, saucesCtrl.getOneSauce);
router.post('/', ensureAuthenticated, saucesCtrl.createSauce);
router.put('/:id', ensureAuthenticated, saucesCtrl.modifySauce);
router.delete('/:id', ensureAuthenticated, saucesCtrl.deleteSauce);
router.post('/:id/like', ensureAuthenticated, saucesCtrl.likeSauce);

module.exports = router;

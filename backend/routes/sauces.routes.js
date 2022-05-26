const router = require('express').Router();
const saucesCtrl = require('../controllers/sauces.controller');
const { ensureAuthenticated, ensureUserIsOwner } = require('../middlewares/security.middleware');

// --- ROUTERS /API/SAUCES ---
router.get('/', ensureAuthenticated, saucesCtrl.getAllSauces);
router.get('/:id', ensureAuthenticated, saucesCtrl.getOneSauce);
router.post('/', ensureAuthenticated, saucesCtrl.createSauce);
router.put('/:id', ensureAuthenticated, ensureUserIsOwner, saucesCtrl.modifySauce);
router.delete('/:id', ensureAuthenticated, ensureUserIsOwner, saucesCtrl.deleteSauce);
router.post('/:id/like', ensureAuthenticated, saucesCtrl.likeSauce);

module.exports = router;

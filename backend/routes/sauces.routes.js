const router = require('express').Router();
const { uploadSingleImage } = require('../configs/multer.config');
const { ensureAuthenticated, ensureUserIsOwner } = require('../middlewares/security.middleware');
const { newSauceValidator } = require('../middlewares/validator.middleware');
const saucesCtrl = require('../controllers/sauces.controller');

// --- ROUTERS /API/SAUCES ---
router.get('/', ensureAuthenticated, saucesCtrl.getAllSauces);
router.get('/:id', ensureAuthenticated, saucesCtrl.getOneSauce);
router.post('/', ensureAuthenticated, uploadSingleImage, newSauceValidator, saucesCtrl.createSauce);
router.put('/:id', ensureAuthenticated, ensureUserIsOwner, uploadSingleImage, saucesCtrl.modifySauce);
router.delete('/:id', ensureAuthenticated, ensureUserIsOwner, saucesCtrl.deleteSauce);
router.post('/:id/like', ensureAuthenticated, saucesCtrl.likeSauce);

module.exports = router;

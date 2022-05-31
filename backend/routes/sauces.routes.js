const router = require('express').Router();
const { uploadSingleImage } = require('../configs/multer.config');
const { ensureAuthenticated, ensureUserIsOwner } = require('../middlewares/security.middleware');
const { sauceValidator } = require('../middlewares/validator.middleware');
const saucesCtrl = require('../controllers/sauces.controller');

// --- ROUTERS /API/SAUCES ---
router.get('/', ensureAuthenticated, saucesCtrl.getAllSauces);
router.get('/:id', ensureAuthenticated, saucesCtrl.getOneSauce);
router.post('/', ensureAuthenticated, uploadSingleImage, sauceValidator, saucesCtrl.createSauce);
router.put('/:id', ensureAuthenticated, ensureUserIsOwner, uploadSingleImage, sauceValidator, saucesCtrl.modifySauce);
router.delete('/:id', ensureAuthenticated, ensureUserIsOwner, saucesCtrl.deleteSauce);
router.post('/:id/like', ensureAuthenticated, saucesCtrl.likeSauce);

module.exports = router;

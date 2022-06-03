const router = require('express').Router();
const { ensureAuthenticated, ensureUserIsOwner } = require('../middlewares/security.middleware');
const { uploadSauceImage } = require('../configs/multer.config');
const { sauceValidator } = require('../middlewares/validator.middleware');
const saucesCtrl = require('../controllers/sauces.controller');

// --- ROUTERS /API/SAUCES ---
router.get('/', ensureAuthenticated, saucesCtrl.getAllSauces);
router.get('/:id', ensureAuthenticated, saucesCtrl.getOneSauce);
router.post('/', ensureAuthenticated, uploadSauceImage, sauceValidator, saucesCtrl.createSauce);
router.put('/:id', ensureAuthenticated, ensureUserIsOwner, uploadSauceImage, sauceValidator, saucesCtrl.modifySauce);
router.delete('/:id', ensureAuthenticated, ensureUserIsOwner, saucesCtrl.deleteSauce);
router.post('/:id/like', ensureAuthenticated, saucesCtrl.likeSauce);

module.exports = router;

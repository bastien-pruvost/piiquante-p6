const router = require('express').Router();
const saucesCtrl = require('../controllers/sauces.controller');
const { ensureAuthenticated } = require('../middlewares/security.middleware');

// --- ROUTERS /API/SAUCES ---
router.get('/', saucesCtrl.getAllSauces);
router.get('/:id', saucesCtrl.getOneSauce);
router.post('/', saucesCtrl.sauceCreate);
router.put('/:id', saucesCtrl.sauceModify);
router.delete('/:id', saucesCtrl.sauceDelete);
router.post('/:id/like', saucesCtrl.sauceLike);

module.exports = router;

const router = require('express').Router();
const saucesCtrl = require('../controllers/sauces.controller');

router.use('/', (req, res, next) => {
  res.status(200).json({ message: 'ok' });
});
router.use('/:id', (req, res, next) => {
  res.status(200).json({ message: 'ok' });
});

module.exports = router;

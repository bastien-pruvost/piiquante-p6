const { body, check, validationResult } = require('express-validator');

const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorMsg = '';
    errors.errors.forEach((error) => {
      errorMsg += `${error.msg}, `;
    });
    return res.status(400).json({ message: errorMsg });
  }
  return next();
};

exports.signupValidator = [
  body('email').isEmail().withMessage(`L'adresse email n'est pas au bon format`),
  body('password').isLength({ min: 5 }).withMessage('Le mot de passe doit contenir au minimum 5 charactères'),
  (req, res, next) => {
    checkValidationErrors(req, res, next);
  },
];

exports.newSauceValidator = (req, res, next) => {
  if (!(req.file && req.file.fieldname === 'image')) {
    return res.status(400).json({ message: 'Vous devez fournir une image pour la sauce' });
  }
  return next();
};

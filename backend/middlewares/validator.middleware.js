const { body, validationResult } = require('express-validator');

exports.signupValidator = [
  body('email').isEmail().withMessage(`L'adresse email n'est pas au bon format`),

  body('password').isLength({ min: 5 }).withMessage('Le mot de passe doit contenir au minimum 5 charactères'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorMsg = '';
      errors.errors.forEach((error) => {
        errorMsg += `${error.msg}, `;
      });
      return res.status(406).json({ message: errorMsg });
    }
    return next();
  },
];

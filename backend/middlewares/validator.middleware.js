const fs = require('fs');
const { body, validationResult } = require('express-validator');

// Manages errors from different express-validators to return them to the user
const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorMsg = '';
    errors.errors.forEach((error) => {
      errorMsg += `${error.msg}.   `;
    });
    return res.status(400).json({ message: errorMsg });
  }
  return next();
};

// Check the format of inputs in the signup form
exports.signupValidator = [
  body('email').isEmail().withMessage(`L'adresse email n'est pas au bon format`),
  body('password')
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    .withMessage(
      'Le mot de passe doit contenir au minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
    ),
  (req, res, next) => {
    checkValidationErrors(req, res, next);
  },
];

// Checks that the request to create or modify a sauce is complete
exports.sauceValidator = (req, res, next) => {
  if (req.file && !req.body.sauce) {
    fs.unlink(`public/images/${req.file.filename}`, (err) => console.log(err));
    return res.status(400).json({ message: `Il manque l'objet sauce dans la requête` });
  }
  if (req.body.sauce && !req.file) {
    return res.status(400).json({ message: `Il manque l'image dans la requête` });
  }
  return next();
};

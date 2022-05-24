const argon2 = require('argon2');

exports.hashPassword = async (password) => {
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 16384,
    });
  } catch (err) {
    throw new Error(`Erreur d'encryptage' : ${err}`);
  }
};

exports.verifyPassword = async (password, encryptedPassword) => {
  try {
    return await argon2.verify(encryptedPassword, password);
  } catch (err) {
    throw new Error(`Erreur de décryptage : ${err}`);
  }
};

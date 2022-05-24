const mongoose = require('mongoose');

exports.clientP = mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@hottakes.zv7se.mongodb.net/HotTakesData?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log('Connexion a MongoDB réussie.'))
  .catch((err) => {
    throw new Error(`Erreur de connexion a la base de données : ${err}`);
  });

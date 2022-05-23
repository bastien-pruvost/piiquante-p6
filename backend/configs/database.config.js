const mongoose = require('mongoose');

exports.clientP = mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@hottakes.zv7se.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log('Connexion a MongoDB réussie.'))
  .catch((err) => console.log(`ERREUR DE CONNEXION A MONGODB : ${err}`));

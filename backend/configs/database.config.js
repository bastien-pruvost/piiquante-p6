const mongoose = require('mongoose');

// Connect app to the MongoDB database with mongoose
exports.clientP = mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@hottakes.zv7se.mongodb.net/HotTakesData?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connexion à MongoDB réussie.'))
  .catch((err) => {
    console.error(`Erreur de connexion à MongoDB : ${err}`);
  });

const mongoose = require('mongoose');

module.exports = async () => {
  await mongoose
    .connect(
      'mongodb+srv://ntzolov:zZYLb8iwd7rDyaac@movie-characters.vtrawke.mongodb.net/movieCharacters?retryWrites=true&w=majority'
    )
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(() => {
      console.log("Couldn't connect to MongoDB");
    });
};

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3030;

module.exports = async (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ extended: true }));
  app.use(
    cors({
      origin: 'https://movie-characters.onrender.com',
    })
  );
  app.options('*', cors());

  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
};

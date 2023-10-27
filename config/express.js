require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsMiddleware = require('../middlewares/corsMiddleware');

const port = process.env.PORT || 3030;

module.exports = async (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ extended: true }));
  // app.use(corsMiddleware);
  // app.use(
  //   cors({
  //     origin: 'https://movie-characters.onrender.com',
  //     credentials: true,
  //   })
  // );
  // app.options('*', cors());

  const corsOptions = {
    origin: true,
    credentials: true,
  };
  app.options('*', cors(corsOptions));

  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
};

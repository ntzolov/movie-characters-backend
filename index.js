const express = require('express');
const databaseConnect = require('./config/database');
const serverConnect = require('./config/express');
const routes = require('./config/routes');

const app = express();

// try {
//   serverConnect(app).then(() => databaseConnect());
// } catch (error) {
//   console.log(error);
// }

const initializeServer = async (app) => {
  try {
    await databaseConnect();
    serverConnect(app);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

initializeServer(app);
routes(app);

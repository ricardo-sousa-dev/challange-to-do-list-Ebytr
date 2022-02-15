require('dotenv').config(); // import dotenv to use .env file
const express = require('express'); // import express module
const app = express(); // create an instance of express
const bodyParser = require('body-parser'); // import body-parser to parse the body of the request
const errorHandler = require('../middlewares/errorHandler'); // import errorHandler - middleware of error
const router = require('../routes'); // import router from routes
// const cors = require('cors'); // import cors to allow cross-origin requests
// const ORIGIN_FRONT = process.env.ORIGIN_FRONT || 'http://localhost:3000'; // import origin of frontend

// const corsOptions = {
//   origin: ORIGIN_FRONT,
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // use body-parser to parse the body of the request
app.use(router); // use router
app.use(errorHandler); // use errorHandler

module.exports = app; // export app
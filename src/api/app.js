const express = require('express'); // import express module
require('dotenv').config(); // import dotenv to use .env file
const bodyParser = require('body-parser'); // import body-parser to parse the body of the request
const { errorHandler } = require('../middlewares'); // import errorHandler - middleware of error

const app = express(); // create an instance of express
const router = require('../routes'); // import router from routes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // use body-parser to parse the body of the request

app.use(router); // use router
app.use(errorHandler); // use errorHandler

module.exports = app; // export app
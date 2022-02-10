const { MongoClient } = require('mongodb'); // import MongoClient from mongodb
require('dotenv').config(); // import .env file

const OPTIONS = { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const MONGO_DB_URL = process.env.HOST || 'mongodb://27017/ToDoEbytr';
const DB_NAME = process.env.DB_NAME || 'ToDoEbytr';

let db = null;

const connection = () => (
  db ? Promise.resolve(db) : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
      db = conn.db(DB_NAME);
      return db;
    }));

module.exports = connection;

const connect = require('./connection');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret'; // import JWT_SECRET from .env file

const createUserModel = async (user) => {
  const db = await connect();

  const userInserted = await db.collection('users')
    .insertOne(user)
    .then((result) => result.insertedId);

  return userInserted;
};

const findUserByEmailModel = async (email) => {
  const db = await connect();

  const user = await db.collection('users')
    .findOne({ email }, { projection: { name: 1, email: 1, role: 1, _id: 1 } });

  return user;
};

const verifyUsersModel = async (email, password) => {
  const db = await connect();

  const user = await db.collection('users')
    .findOne({ $and: [ { email }, { password } ] },
      { projection: { name: 1, email: 1, role: 1, _id: 1 } });

  return { user };
};

const tokenGenerateModel = async (login) => {
  const { user } = await verifyUsersModel(login.email, login.password);

  if (!user) return null;

  const token = jwt.sign(user, JWT_SECRET);

  return token;
};


module.exports = {
  createUserModel,
  findUserByEmailModel,
  tokenGenerateModel
};

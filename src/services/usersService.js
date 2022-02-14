const usersModel = require('../models/usersModel');
const { errorConstructor, userSchemaValidator, loginSchemaValidator } = require('../utils');

const createUserService = async (user) => {
  const { email, password, name } = user;

  const { error } = userSchemaValidator.validate({ email, password, name });
  if (error) { throw errorConstructor(400, 'Invalid entries. Try again.'); }

  const userExists = await usersModel.findUserByEmailModel(email);
  if (userExists) { throw errorConstructor(409, 'User already registered'); }

  const newUser = await usersModel.createUserModel(user);

  return newUser;
};

const loginUserService = async (login) => {
  const { error } = loginSchemaValidator.validate(login);
  if (error) { throw errorConstructor(401, 'All fields must be filled'); }

  const token = await usersModel.tokenGenerateModel(login);
  if (!token) { throw errorConstructor(401, 'Incorrect username or password'); }

  return token;
};

module.exports = {
  createUserService,
  loginUserService,
};

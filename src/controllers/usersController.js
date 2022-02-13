const usersService = require('../services/usersService');

const createUserController = async (req, res, next) => {
  try {
        const { name, email, password } = req.body;
        const role = 'user';

        const user = await usersService
            .createUserService({ email, password, name, role });

        return res.status(201).json({ user });
    } catch (err) {
        return next(err);
    }
};

const loginUserController = async (req, res, next) => {
   try {
        const token = await usersService.loginUserService(req.body);

        return res.status(200).json({ token });
    } catch (err) {
        return next(err);
    }
};

module.exports = {
  createUserController,
  loginUserController,
};
const tasksService = require('../services/tasksService');

const createTaskController = async (req, res, next) => {
  try {
    const taskData = req.body;

    const task = await tasksService.createTaskService(taskData);

    return res.status(201).json( task );
  } catch (err) {
    return next(err);
  }
};

const getTasksController = async (req, res, next) => {
  try {
    const tasks = await tasksService.getTasksService();

    return res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const updateTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedTask = await tasksService.updateTaskService(id, req.body);

    return res.status(200).json(updatedTask);
  } catch (err) {
    return next(err);
  }
};

const deleteTaskController = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { id } = req.params;

    const taskDeleted = await tasksService.deleteTaskService(id, email);

    return res.status(204).json(taskDeleted);
  } catch (err) {
    return next(err);
  }
};


module.exports = {
  createTaskController,
  getTasksController,
  updateTaskController,
  deleteTaskController,
};
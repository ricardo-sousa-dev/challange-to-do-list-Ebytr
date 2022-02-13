const tasksService = require('../services/tasksService');

const createTaskController = async (req, res, next) => {
  try {
    const taskData = req.body;

    const newTask = await tasksService.createTaskService(taskData);

    return res.status(201).json(newTask);
  } catch (err) {
    next(err);
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
    const { id } = req.params;

    const deletedTask = await tasksService.deleteTaskService(id);

    return res.status(204).json(deletedTask);
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
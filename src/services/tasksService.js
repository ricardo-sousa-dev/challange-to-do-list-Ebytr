const tasksModel = require('../models/tasksModel');
const { errorConstructor, taskSchemaValidator } = require('../utils');

const createTaskService = async (taskData) => {
  const { error } = taskSchemaValidator.validate(taskData);
  if (error) { throw errorConstructor(400, 'Invalid entries. Try again.'); }

  const newTask = await tasksModel.createTaskModel(taskData);

  return newTask;
};

const getTasksService = async () => {
  const tasks = await tasksModel.getTasksModel();

  return tasks;
};

const updateTaskService = async (idTask, changesTasks) => {
  const exists = await tasksModel.getTaskIdModel(idTask);
  if (!exists) { throw errorConstructor(422, 'Task not exists'); }

  const updatedTask = await tasksModel
    .updateTaskModel(idTask, changesTasks);

  return updatedTask;
};

const deleteTaskService = async (idTask) => {
  const exists = await tasksModel.getTaskIdModel(idTask);
  if (!exists) { throw errorConstructor(422, 'Task not exists'); }

  const deletedTask = await tasksModel.deleteTaskModel(idTask);

  return deletedTask;
};

module.exports = {
  createTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService,

};

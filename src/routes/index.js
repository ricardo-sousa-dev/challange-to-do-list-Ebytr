const express = require('express'); // import express module

const {
  createTaskController,
  getTasksController,
  updateTaskController,
  deleteTaskController,
} = require('../controllers/tasksController'); // import tasksController

const router = express.Router(); // create an instance of express.Router()

// Routes for tasks
router.post('/tasks', createTaskController);
router.get('/tasks', getTasksController);
router.put('/tasks/:id', updateTaskController);
router.delete('/tasks/:id', deleteTaskController);

module.exports = router; // export router

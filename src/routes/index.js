const express = require('express'); // import express module
const { auth } = require('../middlewares'); // import auth and multerMiddleware - middlewares

const {
  createTaskController,
  getTasksController,
  updateTaskController,
  deleteTaskController,
} = require('../controllers/tasksController'); // import tasksController

const {
  createUserController,
  loginUserController,
} = require('../controllers/usersController'); // import usersController

const router = express.Router(); // create an instance of express.Router()

// Routes for tasks
router.post('/tasks', auth, createTaskController);
router.get('/tasks', auth, getTasksController);
router.put('/tasks/:id', updateTaskController);
router.delete('/tasks/:id', deleteTaskController);
router.post('/user', createUserController);
router.post('/login', loginUserController)

module.exports = router; // export router

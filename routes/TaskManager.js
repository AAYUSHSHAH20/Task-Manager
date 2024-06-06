const express = require('express');
const routes = express.Router();
const {getallTask,createTask,updateTask,deleteTask,toggleTaskCompletion,checkDueDates} = require('../controllers/TaskManager');
const Task = require('../models/Task');
const advanceResults = require('../middleware/advanceResults')

routes.route('/').get(advanceResults(Task), getallTask).post(createTask);


routes.route('/:id').put(updateTask).delete(deleteTask);

routes.route('/:id/toggle').put(toggleTaskCompletion);

routes.route('/check-due-dates').get(checkDueDates);

module.exports = routes

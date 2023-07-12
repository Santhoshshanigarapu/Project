const asyncLib = require('async');
const Task = require('../models/task');
const dotenv = require("dotenv");
dotenv.config();
const db = require('../db/connection');

const taskHandlers = {
  taskA: async () => {
    try {
      const task = await Task.create({ name: 'Task gA', completed: true });
      console.log('Created Task gA:', task);
    } catch (error) {
      console.error('Error in database operation for Task A:', error.message);
    }
  },
  taskB: async () => {
    try {
      const completedTasks = await Task.find({ completed: true }).exec();
      console.log('Completed tasks:', completedTasks);
    } catch (error) {
      console.error('Error in database operation for Task B:', error.message);
    }
  },
  taskC: async () => {
    try {
      const task = await Task.findOneAndUpdate({ name: 'Task HHA' }, { completed: false }, { new: true });
      if (task) {
        console.log('Updated Task HHA in the database:', task);
      } else {
        console.log('Task AA not found in the database');
      }
    } catch (error) {
      console.error('Error in database operation for Task C:', error.message);
    }
  },
  taskD: async () => {
    try {
      const task = await Task.create({ name: 'Task gga', completed: true });
      console.log('Created Task gga:', task);
    } catch (error) {
      console.error('Error in database operation for Task D:', error.message);
    }
  },
  // Add more task handlers as needed
};

const workflowConfig = {
  workflow1: ['taskA', 'taskB'], // taskB depends on taskA
  workflow2: ['taskC', 'taskD'], // taskC does not have any dependencies, taskD is a separate task
  // Add more workflows as needed
};

function processTask(taskName, callback) {
  const taskHandler = taskHandlers[taskName];
  if (taskHandler) {
    taskHandler()
      .then(() => callback(null)) // Call the callback with null for success
      .catch((error) => callback(error));
  } else {
    callback(new Error(`Task handler not found for '${taskName}'`));
  }
}

function executeWorkflow(workflowName, callback) {
  const tasks = workflowConfig[workflowName];
  if (tasks) {
    asyncLib.series(
      tasks.map((task) => (callback) => processTask(task, callback)),
      (error) => {
        if (error) {
          console.error('Error executing workflow:', error);
          callback(error);
        } else {
          console.log(`Workflow '${workflowName}' executed successfully.`);
          callback(); // Call the callback without any parameter for success
        }
      }
    );
  } else {
    const error = new Error(`Workflow '${workflowName}' not found.`);
    console.error(error);
    callback(error);
  }
}

module.exports = { executeWorkflow };

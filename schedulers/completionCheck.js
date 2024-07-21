const cron = require('node-cron');
const Task = require('../schema/taskSchema'); 

const completionCheck = async() => {
  // Run the task every day at midnight
    try {
      const now = new Date();
      const tasks = await Task.find({
        status: { $nin: ['completed', 'incomplete'] },
        deadline: { $lt: now }
      });

      for (const task of tasks) {
        task.status = 'incomplete';
        await task.save();
        console.log(`${task.title} is marked incomplete`);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
};

module.exports = completionCheck;

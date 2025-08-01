// 代码生成时间: 2025-08-01 15:12:23
const cron = require('node-cron');
const logger = require('./logger'); // 假设有一个logger模块用于日志记录

// 定时任务调度器类
class ScheduledTasks {
  // 任务列表，用于存储所有的定时任务
  tasks = [];

  // 添加任务
  addTask(taskName, cronPattern, taskFunction) {
    try {
      const task = cron.schedule(cronPattern, taskFunction);
      this.tasks.push({
        name: taskName,
        task
      });
      logger.info(`Scheduled task '${taskName}' added with pattern '${cronPattern}'`);
    } catch (error) {
      logger.error(`Failed to add scheduled task '${taskName}': ${error.message}`);
    }
  }

  // 移除任务
  removeTask(taskName) {
    const index = this.tasks.findIndex(task => task.name === taskName);
    if (index !== -1) {
      this.tasks[index].task.stop();
      this.tasks.splice(index, 1);
      logger.info(`Scheduled task '${taskName}' removed`);
    } else {
      logger.warn(`Scheduled task '${taskName}' not found`);
    }
  }

  // 停止所有任务
  stopAll() {
    this.tasks.forEach(task => {
      task.task.stop();
    });
    this.tasks = [];
    logger.info('All scheduled tasks have been stopped');
  }
}

// 实例化定时任务调度器
const scheduledTasks = new ScheduledTasks();

// 示例：添加一个每10秒执行一次的任务
scheduledTasks.addTask('sampleTask', '*/10 * * * *', () => {
  logger.info('Sample task executed');
});

// 导出定时任务调度器实例，以便在其他地方使用
module.exports = scheduledTasks;
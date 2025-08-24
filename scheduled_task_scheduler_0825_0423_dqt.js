// 代码生成时间: 2025-08-25 04:23:37
const { schedule } = require('node-cron');
const logger = require('./logger'); // 引入日志记录器模块

// 定时任务调度器类
class ScheduledTaskScheduler {
  // 构造函数，接收一个任务列表
  constructor(tasks) {
    this.tasks = tasks;
  }

  // 启动所有定时任务
  startAll() {
    this.tasks.forEach((task) => {
      try {
        schedule(task.schedule, () => {
          logger.info(`Executing task: ${task.name}`);
          task.function(); // 执行任务函数
        }, { scheduled: true });
      } catch (error) {
        logger.error(`Failed to schedule task: ${task.name}, error: ${error.message}`);
      }
    });
  }
}

// 示例任务函数
function exampleTask() {
  console.log('Example task is running...');
}

// 任务列表
const tasks = [
  {
    name: 'Example Task',
    schedule: '*/5 * * * *', // 每5分钟执行一次
    function: exampleTask
  }
  // 可以在这里添加更多任务
];

// 创建调度器实例并启动任务
const scheduler = new ScheduledTaskScheduler(tasks);
scheduler.startAll();
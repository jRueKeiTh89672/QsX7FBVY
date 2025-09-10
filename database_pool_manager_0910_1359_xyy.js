// 代码生成时间: 2025-09-10 13:59:01
const { Pool } = require('pg'); // 使用pg库来实现PostgreSQL连接池

/**
 * DatabasePoolManager 负责管理数据库连接池
 * @class
 */
class DatabasePoolManager {
  
  constructor() {
    // 初始化连接池配置
    this.pool = new Pool({
      user: 'your_username',       // 替换成你的数据库用户名
      host: 'localhost',          // 替换成你的数据库地址
      database: 'your_database',   // 替换成你的数据库名称
      password: 'your_password',   // 替换成你的数据库密码
      port: 5432,                  // 替换成你的数据库端口（如果是PostgreSQL）
    });
  }

  /**
   * 获取数据库连接
   * @returns {Promise} 返回一个连接对象的Promise
   */
  getConnection() {
    return new Promise((resolve, reject) => {
      // 从连接池中请求一个连接
      this.pool.connect((err, client, done) => {
        if (err) {
          // 处理连接错误
          console.error('Failed to get a connection from the pool:', err);
          reject(err);
        } else {
          // 成功获取连接
          resolve(client);
        }
      });
    });
  }

  /**
   * 释放数据库连接
   * @param {Object} client - 数据库连接对象
   */
  releaseConnection(client) {
    // 释放连接到连接池
    client.release();
  }

  /**
   * 执行数据库查询
   * @param {String} query - SQL查询字符串
   * @returns {Promise} 返回查询结果的Promise
   */
  queryDatabase(query) {
    return new Promise((resolve, reject) => {
      this.getConnection()
        .then(client => {
          client.query(query, (err, res) => {
            this.releaseConnection(client);
            if (err) {
              // 处理查询错误
              console.error('Database query failed:', err);
              reject(err);
            } else {
              // 查询成功，返回结果
              resolve(res.rows);
            }
          });
        }).catch(reject); // 将getConnection的错误传递出去
    });
  }
}

// 导出DatabasePoolManager类
module.exports = DatabasePoolManager;
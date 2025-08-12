// 代码生成时间: 2025-08-13 04:10:47
const { Pool } = require('pg'); // Assuming PostgreSQL as the database

class DatabasePoolManager {
  /*
   * Constructor for the DatabasePoolManager class
   * Initializes the pool with the provided configuration
   *
   * @param {Object} config - Database configuration object
   */
  constructor(config) {
    if (!config) {
      throw new Error('Database configuration is required.');
    }

    this.pool = new Pool(config);
  }

  /*
   * Acquire a connection from the pool
   *
   * @returns {Promise} - A promise that resolves with the acquired connection
   */
  async acquireConnection() {
    try {
      // Get a connection from the pool
      const client = await this.pool.connect();
      return client;
    } catch (error) {
      // Handle errors when acquiring connection from the pool
      console.error('Failed to acquire connection:', error);
      throw error;
    }
  }

  /*
   * Release a connection back to the pool
   *
   * @param {Object} client - The connection client to release
   */
  releaseConnection(client) {
    if (client) {
      client.release();
    } else {
      console.warn('No client to release');
    }
  }

  /*
   * Handle the end of a query execution
   * It will release the connection back to the pool
   *
   * @param {Object} client - The connection client to release
   */
  async endQuery(client) {
    try {
      if (client) {
        await client.query('END');
        this.releaseConnection(client);
      }
    } catch (error) {
      console.error('Failed to end query:', error);
      this.releaseConnection(client); // Release the connection anyway
    }
  }
}

module.exports = DatabasePoolManager;

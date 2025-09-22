// 代码生成时间: 2025-09-22 18:43:44
const { Pool } = require('pg'); // PostgreSQL client

// Configuration for the database connection pool
const poolConfig = {
  max: 20, // Maximum number of clients in the pool
  min: 0, // Minimum number of clients in the pool
  idleTimeoutMillis: 30000, // Close connections that are idle for more than 30 seconds
  connectionTimeoutMillis: 2000, // If a client cannot be obtained within 2000ms, throw an error
  // Add other configurations as needed
};

// Create a new pool instance
const pool = new Pool(poolConfig);

class DatabasePoolManager {
  // Method to query the database
  static async query(text, params) {
    try {
      // Connect to the database using the connection pool
      const client = await pool.connect();
      try {
        // Execute the query
        const res = await client.query(text, params);
        // Return the result of the query
        return res;
      } catch (err) {
        // Handle query error
        console.error('Database query error:', err);
        throw err;
      } finally {
        // Release the client back to the pool
        client.release();
      }
    } catch (err) {
      // Handle pool connection error
      console.error('Database pool connection error:', err);
      throw err;
    }
  }

  // Method to end the pool and all active clients
  static async end() {
    try {
      // Close the pool and wait for all clients to end
      await pool.end();
    } catch (err) {
      // Handle pool end error
      console.error('Database pool end error:', err);
      throw err;
    }
  }
}

// Export the DatabasePoolManager class
module.exports = DatabasePoolManager;
// 代码生成时间: 2025-09-14 21:10:15
const fs = require('fs');
const path = require('path');

class ConfigManager {
  /**
# NOTE: 重要实现细节
   * Constructor for the ConfigManager class.
   * @param {string} configPath - The path to the Gatsby configuration file.
   */
# 优化算法效率
  constructor(configPath) {
    this.configPath = configPath;
  }

  /**
   * Reads the Gatsby configuration file and returns its content.
# 改进用户体验
   * @returns {Promise<Object>} - The configuration object.
   */
  async readConfig() {
    try {
      const configContent = await fs.promises.readFile(this.configPath, 'utf8');
      return JSON.parse(configContent);
    } catch (error) {
      console.error('Error reading configuration file:', error);
      throw new Error('Failed to read configuration file.');
    }
# 扩展功能模块
  }

  /**
   * Writes the given configuration object to the Gatsby configuration file.
   * @param {Object} config - The configuration object to be written.
# 增强安全性
   * @returns {Promise<void>} - A promise that resolves when the write operation is complete.
   */
# 增强安全性
  async writeConfig(config) {
    try {
      const configContent = JSON.stringify(config, null, 2);
# NOTE: 重要实现细节
      await fs.promises.writeFile(this.configPath, configContent);
    } catch (error) {
      console.error('Error writing configuration file:', error);
      throw new Error('Failed to write configuration file.');
    }
# 添加错误处理
  }

  /**
   * Updates a specific key in the configuration file with a new value.
   * @param {string} key - The key to update in the configuration.
   * @param {any} value - The new value for the specified key.
   * @returns {Promise<void>} - A promise that resolves after the update operation.
   */
  async updateConfig(key, value) {
# NOTE: 重要实现细节
    try {
      const config = await this.readConfig();
      config[key] = value;
      await this.writeConfig(config);
    } catch (error) {
      console.error('Error updating configuration:', error);
      throw new Error('Failed to update configuration.');
    }
  }
}

// Example usage:
// const configManager = new ConfigManager('./gatsby-config.json');
// configManager.readConfig().then(config => console.log(config)).catch(error => console.error(error));
// 代码生成时间: 2025-09-14 09:14:30
 * It includes error handling, documentation, and follows best practices to ensure maintainability and extensibility.
 */

// Import necessary modules
const os = require('os');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { ApolloServerPluginInlineTrace } = require('@apollo/server/plugin/inlineTrace');

// Create a Gatsby plugin for memory usage analysis
const MemoryUsageAnalysisPlugin = (options) => {
  // Define plugin options with defaults
  const {
    enableDrainHttpServer = true,
    enableInlineTrace = true,
  } = options;

  return {
    // Apply the plugin to the Gatsby server
    apply: 'server',

    // Initialize the plugin
    config: (gatsbyConfig) => {
      // Check for required options
      if (!enableDrainHttpServer && !enableInlineTrace) {
        throw new Error('At least one of the plugins must be enabled');
      }

      // Apply the drainHttpServer plugin if enabled
      if (enableDrainHttpServer) {
        gatsbyConfig.plugins.push(
          ApolloServerPluginDrainHttpServer()
        );
      }

      // Apply the inlineTrace plugin if enabled
      if (enableInlineTrace) {
        gatsbyConfig.plugins.push(
          ApolloServerPluginInlineTrace()
        );
      }

      return gatsbyConfig;
    },

    // Analyze memory usage
    analyzeMemoryUsage: () => {
      // Get the current memory usage
      const memoryUsage = os.totalmem() - os.freemem();

      // Log the memory usage
      console.log(`Current memory usage: ${memoryUsage} bytes`);

      // Return the memory usage for further processing
      return memoryUsage;
    },
  };
};

// Export the plugin
module.exports = MemoryUsageAnalysisPlugin;
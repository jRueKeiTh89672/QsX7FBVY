// 代码生成时间: 2025-09-21 18:01:53
const axios = require('axios');

/**
 * API Response Formatter Tool
 * This tool formats API responses to a standardized format.
 *
 * @module apiResponseFormatter
 */

/**
 * Formats the API response to a standardized JSON format.
 *
 * @param {string} url - The API endpoint URL.
 * @param {Object} params - The parameters to be sent with the API request.
 * @returns {Promise<Object>} A promise that resolves to a formatted API response object.
 */
async function formatApiResponse(url, params) {
  try {
    // Send a GET request to the API endpoint with the provided parameters
    const response = await axios.get(url, { params });

    // Check if the response is successful
    if (response.status >= 200 && response.status < 300) {
      // Return the formatted response
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } else {
      // Throw an error if the response is not successful
      throw new Error(`API request failed with status: ${response.status}`);
    }
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error('API request error:', error.message);
    throw error;
  }
}

module.exports = { formatApiResponse };

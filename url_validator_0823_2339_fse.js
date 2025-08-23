// 代码生成时间: 2025-08-23 23:39:33
const axios = require('axios');

/**
 * Validates the given URL by checking its response status.
 * @param {string} url - The URL to be validated
 * @returns {Promise<boolean>} - A promise that resolves to true if the URL is valid, otherwise false.
 */
async function validateUrl(url) {
  // Check if the URL is not null and has a length greater than 0
  if (!url || url.length === 0) {
    throw new Error('The URL provided is invalid or empty.');
  }

  try {
    // Send a HEAD request to the URL to check its validity without downloading the entire content
    const response = await axios.head(url, {
      timeout: 5000, // Set a timeout of 5 seconds for the request
    });

    // If the response status is 200, the URL is considered valid
    return response.status === 200;
  } catch (error) {
    // Log the error and return false indicating the URL is not valid
    console.error('Error validating URL:', error.message);
    return false;
  }
}

// Example usage:
// validateUrl('https://example.com').then(isValid => {
//   if (isValid) {
//     console.log('The URL is valid.');
//   } else {
//     console.log('The URL is not valid.');
//   }
// });
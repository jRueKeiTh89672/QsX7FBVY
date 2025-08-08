// 代码生成时间: 2025-08-08 22:26:20
const axios = require('axios');

/**
 * Checks if a URL is valid and accessible.
 * @param {string} url - The URL to be validated.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the URL is valid and accessible, `false` otherwise.
 */
async function validateUrl(url) {
  // Check if the URL is in a valid format using a regex pattern
  if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(url)) {
    console.error('Invalid URL format:', url);
    return false;
  }

  try {
    // Make a HEAD request to check the URL's accessibility
    const response = await axios.head(url);
    // Check if the response status code indicates a successful response
    if (response.status >= 200 && response.status < 300) {
      return true;
    } else {
      console.error('URL is not accessible or not found:', url);
      return false;
    }
  } catch (error) {
    // Handle any errors that occur during the HTTP request
    console.error('Error validating URL:', error.message);
    return false;
  }
}

// Example usage:
// validateUrl('https://www.example.com').then(isValid => {
//   if (isValid) {
//     console.log('URL is valid and accessible.');
//   } else {
//     console.log('URL is invalid or not accessible.');
//   }
// });

module.exports = validateUrl;
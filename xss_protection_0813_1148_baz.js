// 代码生成时间: 2025-08-13 11:48:19
const sanitizeHtml = require('sanitize-html');
# 增强安全性

// Configuration for sanitize-html to prevent XSS attacks.
# 扩展功能模块
const xssConfig = {
  allowedTags: [],
  allowedAttributes: [],
  selfClosing: [],
  allowedSchemes: ['data'],
# 增强安全性
  allowedSchemesByTag: {},
  allowProtocolRelative: false,
  parser: new (require("dompurify").JSDOMParser)().window.DOMParser(),
  transformers: [],
  textFilter: text => text,
  // ... additional configuration can be added as needed
};

// Function to sanitize the user input to prevent XSS attacks.
// This function can be extended to handle other types of inputs as needed.
function sanitizeInput(input) {
  // Check if input is undefined or null and throw an error if so.
  if (typeof input === 'undefined' || input === null) {
    throw new Error('Input cannot be undefined or null.');
  }

  try {
    // Sanitize the input using the sanitize-html library.
    const sanitizedInput = sanitizeHtml(input, xssConfig);
    return sanitizedInput;
  } catch (error) {
    // Handle any errors that occur during sanitization.
    console.error('Error sanitizing input:', error);
    throw error;
  }
}

// Example usage of the sanitizeInput function.
// In a real-world scenario, this would be used within a Gatsby page or plugin.
const userInput = "<script>alert('XSS Attack')</script>";
try {
  const safeInput = sanitizeInput(userInput);
  console.log('Safe input:', safeInput);
} catch (error) {
  console.error('Failed to sanitize input:', error);
}

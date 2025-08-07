// 代码生成时间: 2025-08-08 05:12:13
 * Features:
 * - Create an Excel file with data
 * - Handle errors properly
 * - Maintain clear structure for easy understanding and maintainability
 * - Follow JS best practices for readability and scalability
 */

const fs = require('fs');
const xlsx = require('node-xlsx'); // npm package for creating Excel files
const path = require('path');

// Function to create an Excel file with specified data
function createExcelFile(data, filename) {
  // Check if data is valid
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Invalid data provided for Excel file generation.');
  }

  // Construct the Excel buffer
  const buffer = xlsx.build([{
    name: filename,
    data: data
  }]);

  // Construct the file path
  const filePath = path.join(__dirname, filename + '.xlsx');

  // Write buffer to file system
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error('Error creating Excel file:', err);
      throw err;
    }
    console.log('Excel file created successfully at:', filePath);
  });
}

// Example usage
(async () => {
  try {
    // Sample data to be written to Excel
    const excelData = [
      ['ID', 'Name', 'Age'],
      ['1', 'John Doe', '30'],
      ['2', 'Jane Doe', '25']
    ];

    // Call the function with sample data and filename
    await createExcelFile(excelData, 'sampleData');
  } catch (error) {
    // Error handling
    console.error('Failed to create Excel file:', error.message);
  }
})();
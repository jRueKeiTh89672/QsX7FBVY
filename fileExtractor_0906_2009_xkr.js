// 代码生成时间: 2025-09-06 20:09:26
// fileExtractor.js
// This module provides a function to extract compressed files using the Gatsby framework.

const fs = require('fs');
const path = require('path');
const { createGzip } = require('zlib');
const tar = require('tar');
const util = require('util');

// Promisify the tar extraction function for easier use with async/await
const extractTar = util.promisify(tar.x);

// Function to extract a compressed file
async function extractFile(filePath, outputDir) {
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Decompress the file using gzip if it's a gzip file
    let fileStream;
    if (filePath.endsWith('.gz')) {
      fileStream = fs.createReadStream(filePath).pipe(createGzip());
    } else {
      fileStream = fs.createReadStream(filePath);
    }

    // Extract the tar file
    await extractTar({ file: fileStream, C: outputDir });
  } catch (error) {
    // Handle any errors that occur during extraction
    console.error('Error extracting file:', error);
    throw error;
  }
}

// Usage example
(async () => {
  try {
    await extractFile('path/to/your/archive.tar.gz', 'path/to/output/directory');
    console.log('File extraction completed successfully.');
  } catch (error) {
    console.error('Failed to extract file:', error);
  }
})();

// 代码生成时间: 2025-09-23 04:23:02
const fs = require('fs');
const path = require('path');

/**
 * Analyzes the content of a text file and returns statistics.
 * @param {string} filePath - The path to the text file to analyze.
 * @returns {Promise<{wordCount: number, lineCount: number, charCount: number}>} - An object containing word, line, and character counts.
 */
async function analyzeTextFile(filePath) {
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const wordCount = fileContent.split(/\s+/).length - 1; // Count words, ignoring spaces
    const lineCount = fileContent.split('
').length; // Count lines
    const charCount = fileContent.length; // Count characters

    return {
      wordCount,
      lineCount,
      charCount
    };
  } catch (error) {
    console.error('Failed to analyze the text file:', error);
    throw error; // Re-throw the error to allow caller to handle it
  }
}

// Example usage
const filePath = path.join(__dirname, 'example.txt');
analyzeTextFile(filePath)
  .then(stats => {
    console.log(`Word count: ${stats.wordCount}`);
    console.log(`Line count: ${stats.lineCount}`);
    console.log(`Character count: ${stats.charCount}`);
  })
  .catch(error => {
    console.error('Error analyzing the text file:', error);
  });
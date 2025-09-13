// 代码生成时间: 2025-09-13 12:36:05
const fs = require('fs');
const path = require('path');

// Recursively organizes the folder structure based on a predefined structure.
function organizeFolderStructure(sourceDir, targetStructure) {
  // Validate inputs
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory does not exist: ${sourceDir}`);
  }
  if (typeof targetStructure !== 'object') {
    throw new Error('Target structure must be an object');
  }

  // Start organizing the folder structure
  console.log(`Organizing folder structure in: ${sourceDir}`);
  Object.entries(targetStructure).forEach(([dirName, contents]) => {
    // Create the directory if it doesn't exist
    const dirPath = path.join(sourceDir, dirName);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Organize contents if it's an object
    if (contents && typeof contents === 'object') {
      organizeFolderStructure(dirPath, contents);
    }
  });
}

// Example usage. Define the target folder structure
const targetStructure = {
  src: {
    components: {},
    assets: {},
    utils: {},
  },
  // ... can be expanded with other directories and subdirectories
};

// Run the organizer for a specific directory
try {
  const sourceDirectory = './myProject';
  organizeFolderStructure(sourceDirectory, targetStructure);
  console.log('Folder structure organized successfully.');
} catch (error) {
  console.error('Failed to organize folder structure:', error.message);
}

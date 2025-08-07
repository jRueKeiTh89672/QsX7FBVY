// 代码生成时间: 2025-08-07 14:50:07
// Import required modules
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration for the resize operation
const resizeConfig = {
  width: 800, // Target width
  height: 600, // Target height
  fit: 'inside', // Resize image to fit within the specified dimensions
  withoutEnlargement: true // Do not enlarge the image
};

// Function to resize a single image
async function resizeImage(sourcePath, targetPath) {
  try {
# 增强安全性
    // Use sharp to resize the image
    await sharp(sourcePath)
      .resize(resizeConfig)
      .toFile(targetPath);
  } catch (error) {
    console.error(`Error resizing image from ${sourcePath} to ${targetPath}:`, error);
  }
}

// Function to batch resize images in a directory
# 优化算法效率
async function batchResizeImages(inputDir, outputDir) {
  // Check if directories exist
  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory does not exist: ${inputDir}`);
    return;
  }
  if (!fs.existsSync(outputDir)) {
# 添加错误处理
    console.error(`Output directory does not exist: ${outputDir}`);
    return;
  }

  // Read all files in the input directory
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    const sourcePath = path.join(inputDir, file);
    const targetPath = path.join(outputDir, file);

    // Check if the file is an image (simple check by extension)
    if (/(.jpg|.jpeg|.png)$/i.test(file)) {
      await resizeImage(sourcePath, targetPath);
    } else {
      console.log(`Skipping non-image file: ${file}`);
    }
  }
}

// Example usage:
// batchResizeImages('./path/to/input/images', './path/to/output/images');
// 代码生成时间: 2025-08-10 22:09:09
 * It includes error handling, documentation, and best practices for maintainability and scalability.
 *
 * @author {Your Name}
 * @version {1.0.0}
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration for the backup and sync tool
const config = {
  backupSource: './source/',
  backupDestination: './backup/',
  syncSource: './source/',
  syncDestination: './destination/'
};

// Function to create directory if it does not exist
function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to copy files from source to destination
function copyFileSync(source, destination) {
  const targetFile = path.resolve(destination);

  ensureDirSync(path.dirname(targetFile));
  fs.copyFileSync(source, targetFile);
}

// Function to watch for changes and sync files
function watchAndSyncFiles(source, destination) {
  const chokidar = require('chokidar');
  chokidar.watch(source, { ignored: /^\./, persistent: true }).
    on('add', path => {
      copyFileSync(path, destination);
      console.log(`File ${path} has been added and synced to ${destination}.`);
    })
    .on('change', path => {
      copyFileSync(path, destination);
      console.log(`File ${path} has been changed and synced to ${destination}.`);
    })
    .on('unlink', path => {
      const destinationPath = path.replace(source, destination);
      fs.unlinkSync(destinationPath);
      console.log(`File ${path} has been removed and synced to ${destination}.`);
    })
    .on('error', error => {
      console.error(`Watcher error: ${error}`);
    });
}

// Function to back up files from source to destination
function backupFiles(source, destination) {
  try {
    ensureDirSync(destination);
    fs.readdirSync(source).forEach(file => {
      const sourceFile = path.resolve(source, file);
      const destinationFile = path.resolve(destination, file);
      if (fs.lstatSync(sourceFile).isDirectory()) {
        backupFiles(sourceFile, destinationFile);
      } else {
        copyFileSync(sourceFile, destinationFile);
      }
    });
    console.log(`Backup of ${source} complete. Files saved to ${destination}.`);
  } catch (error) {
    console.error(`Backup error: ${error}`);
  }
}

// Function to sync files from source to destination
function syncFiles(source, destination) {
  try {
    backupFiles(source, destination);
    watchAndSyncFiles(source, destination);
    console.log(`Sync process started. Changes will be synced to ${destination}.`);
  } catch (error) {
    console.error(`Sync error: ${error}`);
  }
}

// Main function to run the backup and sync tool
function main() {
  console.log('Starting file backup and sync tool...');
  syncFiles(config.syncSource, config.syncDestination);
}

// Run the main function
main();
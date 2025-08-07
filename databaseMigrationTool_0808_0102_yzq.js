// 代码生成时间: 2025-08-08 01:02:44
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { exec } = require('child_process');

// 数据库迁移配置
const MIGRATION_CONFIG = {
  migrationsPath: path.join(__dirname, 'migrations/'),
  templatePath: path.join(__dirname, 'template/migrationTemplate.js')
};

// 执行数据库迁移的函数
function executeMigration(migrationName) {
  const fullPath = path.join(MIGRATION_CONFIG.migrationsPath, `${migrationName}.js`);
  try {
    fs.accessSync(fullPath, fs.constants.F_OK);
  } catch (e) {
    console.error(chalk.red('Migration file not found: ' + fullPath));
    return;
  }

  console.log(chalk.green('Executing migration: ' + migrationName));
  exec(`node ${fullPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red('Error executing migration: ' + error));
      return;
    }

    console.log(chalk.green('Migration executed successfully: ' + migrationName));
    console.log(stdout);
  });
}

// 简化数据库迁移文件的创建
function createMigrationFile(name) {
  const timestamp = Date.now();
  const fileName = `${timestamp}_${name}.js`;
  const filePath = path.join(MIGRATION_CONFIG.migrationsPath, fileName);
  const templateContent = fs.readFileSync(MIGRATION_CONFIG.templatePath, 'utf8');

  fs.writeFileSync(filePath, templateContent);
  console.log(chalk.green(`Migration file created: ${filePath}`));
}

// 读取所有迁移文件并执行
function runMigrations() {
  const migrationFiles = fs.readdirSync(MIGRATION_CONFIG.migrationsPath);

  migrationFiles.forEach(file => {
    const migrationName = path.basename(file, '.js');
    executeMigration(migrationName);
  });
}

// 检查迁移文件夹是否存在，如果不存在则创建
function checkMigrationsDirectory() {
  if (!fs.existsSync(MIGRATION_CONFIG.migrationsPath)) {
    fs.mkdirSync(MIGRATION_CONFIG.migrationsPath);
    console.log(chalk.green('Migrations directory created at: ' + MIGRATION_CONFIG.migrationsPath));
  }
}

// 导出函数
module.exports = {
  executeMigration,
  createMigrationFile,
  runMigrations,
  checkMigrationsDirectory
};
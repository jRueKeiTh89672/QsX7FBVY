// 代码生成时间: 2025-09-02 16:00:24
// 引入必要的库
const fs = require('fs-extra');
const path = require('path');

// 配置备份源和目标路径
const sourcePath = './src'; // 源路径
const backupPath = './backup'; // 备份路径

// 检查路径是否存在
const checkPathExists = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
};

// 复制文件
const copyFile = async (src, dest) => {
  try {
    await fs.copy(src, dest);
    console.log(`文件 ${src} 复制到 ${dest} 成功`);
  } catch (error) {
    console.error(`文件 ${src} 复制到 ${dest} 失败：${error.message}`);
  }
};

// 同步文件夹
const syncFolder = async (src, dest) => {
  try {
    // 确保目标路径存在
    if (!await checkPathExists(dest)) {
      await fs.ensureDir(dest);
    }

    // 获取源路径下所有文件
    const files = await fs.readdir(src);

    // 遍历文件并复制
    for (const file of files) {
      const srcFile = path.join(src, file);
      const destFile = path.join(dest, file);

      // 检查文件类型
      const isDirectory = await fs.stat(srcFile).then(
        (stat) => stat.isDirectory(),
        () => false
      );

      if (isDirectory) {
        // 如果是文件夹，则递归同步
        await syncFolder(srcFile, destFile);
      } else {
        // 如果是文件，则复制文件
        await copyFile(srcFile, destFile);
      }
    }
  } catch (error) {
    console.error(`同步文件夹 ${src} 到 ${dest} 失败：${error.message}`);
  }
};

// 主程序入口
async function main() {
  try {
    // 同步备份源到备份路径
    await syncFolder(sourcePath, backupPath);
    console.log('文件备份和同步完成');
  } catch (error) {
    console.error(`备份和同步失败：${error.message}`);
  }
}

// 运行主程序
main();
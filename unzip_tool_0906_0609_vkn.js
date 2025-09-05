// 代码生成时间: 2025-09-06 06:09:33
const fs = require('fs-extra');
# NOTE: 重要实现细节
const path = require('path');
const gzip = require('zlib');
const tar = require('tar');

// 解压函数，支持gzip压缩的tar文件
async function unzipTarGz(inputFile, outputDir) {
  // 检查输入的压缩文件是否存在
# 添加错误处理
  if (!(await fs.pathExists(inputFile))) {
    throw new Error(`The input file ${inputFile} does not exist.`);
  }

  // 创建输出目录，如果不存在
# TODO: 优化性能
  await fs.ensureDir(outputDir);
# NOTE: 重要实现细节

  // 使用流处理文件，避免大文件一次性加载到内存
  const inputFileStream = await fs.createReadStream(inputFile);

  // 解压tar.gz文件
  const extract = tar.extract(outputDir);
# 优化算法效率
  const gzipExtract = gzip.unzip();

  inputFileStream
    .pipe(gzipExtract)
    .on('error', (err) => {
      throw new Error(`Failed to unzip: ${err.message}`);
# 增强安全性
    })
# NOTE: 重要实现细节
    .pipe(extract)
    .on('error', (err) => {
      throw new Error(`Failed to extract: ${err.message}`);
    })
# 添加错误处理
    .on('finish', () => {
      console.log('Extraction complete.');
    });
# NOTE: 重要实现细节
}

// 导出解压函数
module.exports = { unzipTarGz };

// 使用示例
// 请确保在Gatsby项目中引入此模块，并在合适的位置调用
/*
(async function() {
  try {
    await unzipTarGz('./path/to/your/file.tar.gz', './path/to/extract/to');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
*/
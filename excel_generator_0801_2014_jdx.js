// 代码生成时间: 2025-08-01 20:14:50
const ExcelJS = require('exceljs');

// Excel表格自动生成器
class ExcelGenerator {
  // 构造函数，用于初始化Excel工作簿和工作表
  constructor() {
    this.workbook = new ExcelJS.Workbook();
    this.sheet = this.workbook.addWorksheet('Sheet1');
  }

  // 添加标题行
  addHeaderRow(headers) {
    this.sheet.addRow(headers);
  }

  // 添加数据行
  addDataRow(data) {
    this.sheet.addRow(data);
  }

  // 写入数据
  writeData(data) {
    try {
      this.sheet.addRows(data);
    } catch (error) {
      console.error('Error writing data:', error);
    }
  }

  // 保存Excel文件
  saveAsFile(filename) {
    try {
      this.workbook.xlsx.writeFile(filename)
        .then(() => console.log(`Excel file saved as ${filename}`));
    } catch (error) {
      console.error('Error saving Excel file:', error);
    }
  }
}

// 示例用法：
const generator = new ExcelGenerator();

// 添加标题行
generator.addHeaderRow(['ID', 'Name', 'Age']);

// 添加数据行
generator.addDataRow([1, 'John Doe', 30]);
generator.addDataRow([2, 'Jane Doe', 28]);

// 保存成文件
generator.saveAsFile('example.xlsx');
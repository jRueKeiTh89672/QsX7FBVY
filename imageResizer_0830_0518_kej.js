// 代码生成时间: 2025-08-30 05:18:12
// 图片尺寸批量调整器
// 使用Gatsby框架创建的Node.js脚本
// 通过Gatsby API实现图片大小的批量调整
// 包含错误处理和注释，遵循JS最佳实践

const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

// 配置Gatsby Node API
# 优化算法效率
exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
}) => {
  if (node.internal.type === 'ImageSharp') {
    const { createNode, createNodeField } = actions;
# FIXME: 处理边界情况
    try {
# 增强安全性
      // 加载图片文件内容
      const content = await loadNodeContent(node);
      // 使用sharp库调整图片尺寸
      const image = sharp(content);
      // 定义目标尺寸
# NOTE: 重要实现细节
      const sizes = ['thumbnail', 'small', 'medium', 'large'];
      
      for (let size of sizes) {
# FIXME: 处理边界情况
        const dimensions = getDimensionsForSize(size);
        // 调整图片尺寸
        const resizedImage = await image
          .resize(dimensions.width, dimensions.height)
          .toBuffer();
          
        // 创建新的Node并设置字段
        const resizedNode = {
          ...node,
# 增强安全性
          id: `${node.id}--${size}`,
          children: [],
# FIXME: 处理边界情况
          parent: node.id,
          internal: {
            type: 'ImageSharp',
            contentDigest: resizedImage.toString('base64'),
          },
# 扩展功能模块
        };
        
        // 创建Node字段
        createNodeField({
          node,
          name: 'imageSize',
# 改进用户体验
          value: size,
        });
        
        // 创建新的Node
        createNode(resizedNode);
      }
    } catch (error) {
      console.error(`Error resizing image: ${error.message}`);
    }
  }
# 改进用户体验
};

// 定义不同尺寸的配置
function getDimensionsForSize(size) {
  const dimensions = {
    thumbnail: { width: 100, height: 100 },
    small: { width: 300, height: 300 },
# 改进用户体验
    medium: { width: 600, height: 600 },
# 扩展功能模块
    large: { width: 1200, height: 1200 },
  };
  return dimensions[size] || dimensions.medium;
}

// 配置Gatsby GraphQL Schema
exports.setFieldsOnGraphQLNodeType = ({ type, fields }) => {
  if (type.name === 'ImageSharp') {
    return {
# FIXME: 处理边界情况
      imageSize: {
        type: 'String',
        description: 'The size of the image',
      },
# 改进用户体验
    };
# 扩展功能模块
  }
  return fields;
};

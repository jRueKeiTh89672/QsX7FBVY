// 代码生成时间: 2025-07-31 20:07:25
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('gatsby/graphql');

// 数据模型类
class DataModel {
  // 数据模型构造函数
  constructor(data) {
    this.data = data;
  }

  // 获取数据
  getData() {
    return this.data;
  }

  // 验证数据
  isValidData() {
    // 根据实际需求添加具体的验证逻辑
    return this.data !== null && this.data !== undefined;
  }
}

// Gatsby Node API，用于创建节点和关系
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  // 定义 GraphQL 类型
  const dataModelType = new GraphQLObjectType({
    name: 'DataModel',
    fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      value: { type: GraphQLInt },
      children: { type: new GraphQLList(dataModelType) },
    })
  });

  // 创建 GraphQL 类型
  createTypes(dataModelType);
}

// Gatsby Node API，用于创建节点
exports.onCreateNode = async ({ node, actions, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  // 检查节点是否符合数据模型
  if (node.internal.type === 'DataModel' && node.id && node.children) {
    try {
      const dataModel = new DataModel({
        id: node.id,
        name: node.name,
        value: node.value,
        children: node.children.map(child => ({
          id: child.id,
          name: child.name,
          value: child.value,
        })),
      });

      // 验证数据
      if (dataModel.isValidData()) {
        // 创建节点
        const nodeData = {
          ...node,
          children: node.children.map(child => createNodeId(`dataModel-${child.id}`)),
          parent: null,
          id: createNodeId(`dataModel-${node.id}`),
          internal: { type: 'DataModel', contentDigest: createContentDigest(dataModel) },
        };
        createNode(nodeData);
        node.children.forEach(child => {
          createParentChildLink({ parent: nodeData, child: child });
        });
      } else {
        // 数据验证失败，抛出错误
        throw new Error('Invalid data model data');
      }
    } catch (error) {
      // 错误处理
      console.error('Error creating DataModel node:', error.message);
    }
  }
};
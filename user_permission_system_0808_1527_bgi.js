// 代码生成时间: 2025-08-08 15:27:47
// Destructure required modules and functions
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('gatsby/graphql');

// Define the User type with permissions
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    permissions: { type: new GraphQLNonNull(GraphQLString) }, // e.g., 'admin', 'editor', 'viewer'
  },
});

// Define the Root Query type
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        try {
          // Simulate fetching user data based on id
          const userData = fetchUserData(args.id);
          if (!userData) {
            throw new Error('User not found');
          }
          return userData;
        } catch (error) {
          console.error('Error fetching user data:', error);
          throw new Error('Failed to fetch user data');
        }
      },
    },
  },
});

// Simulate a function to fetch user data
// This would typically interact with a database or data source
function fetchUserData(userId) {
  // Placeholder for actual user data fetching logic
  const users = {
    '1': { id: '1', username: 'admin', permissions: 'admin' },
    '2': { id: '2', username: 'editor', permissions: 'editor' },
    '3': { id: '3', username: 'viewer', permissions: 'viewer' },
  };
  return users[userId] || null;
}

// Export the Root Query type for Gatsby to use
module.exports = {
  RootQuery,
  UserType,
};

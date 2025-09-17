// 代码生成时间: 2025-09-17 11:44:59
// Define the User class to represent users within the system
class User {
  constructor(id, username, permissions) {
    this.id = id;
    this.username = username;
    this.permissions = permissions; // Permissions array should contain strings representing permissions
  }

  // Check if the user has a specific permission
  hasPermission(permission) {
    return this.permissions.includes(permission);
  }
}

// Define the PermissionManager class to manage user permissions
class PermissionManager {
  constructor() {
    this.users = [];
  }

  // Add a new user to the system
  addUser(id, username, permissions) {
    const user = new User(id, username, permissions);
    this.users.push(user);
    return user;
  }

  // Remove a user from the system by their ID
  removeUser(userId) {
    this.users = this.users.filter(user => user.id !== userId);
  }

  // Update a user's permissions
  updatePermissions(userId, newPermissions) {
    const user = this.users.find(user => user.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.permissions = newPermissions;
  }

  // Check if a user has a specific permission
  checkPermission(userId, permission) {
    const user = this.users.find(user => user.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user.hasPermission(permission);
  }
}

// Export the PermissionManager class to be used in other parts of the Gatsby application
module.exports = PermissionManager;
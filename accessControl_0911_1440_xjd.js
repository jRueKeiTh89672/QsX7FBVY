// 代码生成时间: 2025-09-11 14:40:13
const { User } = require('./models'); // 引入User模型
const { isAuthenticated } = require('./authMiddleware'); // 引入认证中间件

// 权限控制中间件
const accessControl = (role) => {
  return async (req, res, next) => {
    try {
      // 验证用户是否已认证
      await isAuthenticated(req);

      // 获取当前用户
      const user = await User.findById(req.user.id).populate('role');

      // 检查用户角色是否符合要求
      if (user.role.name !== role) {
        // 如果不符合，返回403错误
        return res.status(403).json({
          error: 'You do not have permission to access this resource.'
        });
      }

      // 如果符合要求，调用next()继续执行后续中间件
      next();
    } catch (error) {
      // 错误处理
      return res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  };
};

module.exports = {
  accessControl
};
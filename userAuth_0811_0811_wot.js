// 代码生成时间: 2025-08-11 08:11:57
// 引入必要的模块和库
const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');

// 创建Express应用
const app = express();
app.use(bodyParser.json());

// 引入用户模型（假设使用MongoDB和Mongoose）
const User = require('./models/User');

// 创建登录路由
app.post('/login', async (req, res) => {
  // 获取请求体中的用户名和密码
  const { username, password } = req.body;
  
  // 检查用户名和密码是否提供
  if (!username || !password) {
    return res.status(400).json({ error: '用户名和密码必须提供' });
  }
  
  try {
    // 根据用户名查找用户
    const user = await User.findOne({ username });
    
    // 检查用户是否存在
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    // 检查密码是否匹配
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: '密码错误' });
    }
    
    // 如果密码匹配，返回成功响应
    res.status(200).json({ message: '登录成功' });
  } catch (error) {
    // 处理错误
    console.error(error);
    res.status(500).json({ error: '内部服务器错误' });
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
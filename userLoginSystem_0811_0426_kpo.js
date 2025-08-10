// 代码生成时间: 2025-08-11 04:26:34
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Assuming a User model with email and password fields
const app = express();
const SECRET_KEY = process.env.SECRET_KEY; // Secret key for JWT
# FIXME: 处理边界情况

// Middleware to check JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
# FIXME: 处理边界情况
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route to login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
# TODO: 优化性能
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Email not found.');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).send('Invalid credentials.');
    const token = jwt.sign({ id: user._id }, SECRET_KEY);
    res.json({ token });
  } catch (error) {
    res.status(500).send(error);
# 增强安全性
  }
});

// Route to protected user data
app.get('/user', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
# FIXME: 处理边界情况
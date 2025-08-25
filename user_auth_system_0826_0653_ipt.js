// 代码生成时间: 2025-08-26 06:53:59
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Define the User model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: String, enum: ['ADMIN', 'USER', 'GUEST'] }],
});

const User = mongoose.model('User', UserSchema);

// Initialize the express application
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/user-auth-db', { useNewUrlParser: true, useUnifiedTopology: true });

// JWT secret key
const JWT_SECRET = 'your_secret_key';

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      roles: ['USER'], // Default role
    });
    await user.save();
    res.status(201).send('User registered successfully.');
  } catch (error) {
    res.status(500).send('Failed to register user.');
  }
});

// Login and get JWT token
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send('User not found.');
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials.');
    }

    const token = jwt.sign({
      username: user.username,
      roles: user.roles,
    }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send('Failed to login.');
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('No token provided.');
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Failed to authenticate token.');
    }
    req.username = decoded.username;
    req.roles = decoded.roles;
    next();
  });
};

// Protected route for admin
app.get('/admin', verifyToken, async (req, res) => {
  if (req.roles.includes('ADMIN')) {
    res.status(200).send('Welcome to the admin dashboard.');
  } else {
    res.status(403).send('Access denied.');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
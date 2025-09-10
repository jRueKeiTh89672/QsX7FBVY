// 代码生成时间: 2025-09-11 07:40:57
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Mock data for demonstration purposes
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  // ... more users
];

// GET /users - Retrieve a list of users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// GET /users/:id - Retrieve a single user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.status(200).json(user);
  }
});

// POST /users - Create a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id - Update a user by ID
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.status(200).json(user);
  }
});

// DELETE /users/:id - Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).json({ error: 'User not found' });
  } else {
    users.splice(index, 1);
    res.status(200).json({ message: 'User deleted' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Document the API endpoints
/**
 * @apiGroup Users
 * @api {get} /users Retrieve a list of users
 * @apiSuccess {Object[]} users List of user objects
 *
 * @api {get} /users/:id Retrieve a single user by ID
 * @apiParam {Number} id User's unique ID
 * @apiSuccess {Object} user User object
 * @apiError (NotFound) {String} error User not found
 *
 * @api {post} /users Create a new user
 * @apiBody {String} name User's name
 * @apiBody {String} email User's email
 * @apiSuccess {Object} newUser Created user object
 *
 * @api {put} /users/:id Update a user by ID
 * @apiParam {Number} id User's unique ID
 * @apiBody {String} [name] Optional user's new name
 * @apiBody {String} [email] Optional user's new email
 * @apiSuccess {Object} user Updated user object
 * @apiError (NotFound) {String} error User not found
 *
 * @api {delete} /users/:id Delete a user by ID
 * @apiParam {Number} id User's unique ID
 * @apiSuccess {String} message User deleted
 * @apiError (NotFound) {String} error User not found
 */
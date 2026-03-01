const express = require("express");
const cors = require("cors");
const mongoose = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// basic user endpoints using Mongo
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/users', async (req, res) => {
  try {
    const u = new User(req.body);
    await u.save();
    res.json({ id: u.id, message: 'User added' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// HR Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).lean();
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Change Password
app.post('/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    if (err.name === 'JsonWebTokenError') return res.status(401).json({ message: 'Invalid token' });
    res.status(500).json(err);
  }
});

// Employees routes mounted from routes/employees.js
app.use('/employees', require('./routes/employees'));

// Departments routes
app.use('/departments', require('./routes/departments'));

// Leaves routes (apply, list, update)
app.use('/leaves', require('./routes/leaves'));

// Attendance routes
app.use('/attendance', require('./routes/attendance'));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

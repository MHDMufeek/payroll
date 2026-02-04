const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Get data from MySQL
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Insert data
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User added" });
  });
});

// HR Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM hr_users WHERE username = ?";
  db.query(sql, [username], async (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(401).json({ message: "Invalid credentials" });
    
    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    
    const token = jwt.sign({ id: user.id, username: user.username }, "secretkey", { expiresIn: "1h" });
    res.json({ token });
  });
});

// Change Password
app.post("/change-password", async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  
  try {
    const decoded = jwt.verify(token, "secretkey");
    const sql = "SELECT * FROM hr_users WHERE id = ?";
    db.query(sql, [decoded.id], async (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0) return res.status(404).json({ message: "User not found" });
      
      const user = result[0];
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updateSql = "UPDATE hr_users SET password = ? WHERE id = ?";
      db.query(updateSql, [hashedPassword, decoded.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Password changed successfully" });
      });
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Employees routes mounted from routes/employees.js
app.use('/employees', require('./routes/employees'));

// Departments routes
app.use('/departments', require('./routes/departments'));

// Leaves routes (apply, list, update)
app.use('/leaves', require('./routes/leaves'));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

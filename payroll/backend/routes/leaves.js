const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

// Simple auth middleware for protected routes
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Create a new leave application (public)
router.post('/', (req, res) => {
  const { name, empId, from, to, reason, email } = req.body || {};
  const sql = `INSERT INTO leaves (name, emp_id, email, from_date, to_date, reason) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [name || null, empId || null, email || null, from || null, to || null, reason || null], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, message: 'Leave application submitted' });
  });
});

// Delete a leave (protected)
router.delete('/:id', requireAuth, (req, res) => {
  const sql = 'DELETE FROM leaves WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Leave deleted' });
  });
});

// Get all leaves (protected - HR)
router.get('/', requireAuth, (req, res) => {
  const sql = 'SELECT * FROM leaves ORDER BY submitted_at DESC';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Get leave by id (protected)
router.get('/:id', requireAuth, (req, res) => {
  const sql = 'SELECT * FROM leaves WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: 'Leave not found' });
    res.json(result[0]);
  });
});

// Update leave status (approve/reject) - protected
router.patch('/:id', requireAuth, (req, res) => {
  const { status } = req.body || {};
  if (!['approved', 'rejected', 'pending'].includes(status)) return res.status(400).json({ message: 'Invalid status' });

  const sql = 'UPDATE leaves SET status = ?, processed_by = ?, processed_at = NOW() WHERE id = ?';
  db.query(sql, [status, req.user.id || null, req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Leave updated' });
  });
});

module.exports = router;

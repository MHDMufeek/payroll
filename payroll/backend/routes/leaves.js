const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
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
router.post('/', async (req, res) => {
  try {
    const data = req.body || {};
    const leave = new Leave({
      name: data.name,
      emp_id: data.empId || data.emp_id,
      email: data.email,
      from_date: data.from,
      to_date: data.to,
      reason: data.reason
    });
    await leave.save();
    res.json({ id: leave.id, message: 'Leave application submitted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a leave (protected)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const removed = await Leave.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Leave not found' });
    res.json({ message: 'Leave deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all leaves (protected - HR)
router.get('/', requireAuth, async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ submitted_at: -1 }).lean();
    res.json(leaves);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get leave by id (protected)
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).lean();
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    res.json(leave);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update leave status (approve/reject) - protected
router.patch('/:id', requireAuth, async (req, res) => {
  const { status } = req.body || {};
  if (!['approved', 'rejected', 'pending'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    leave.status = status;
    leave.processed_by = req.user.id || null;
    leave.processed_at = new Date();
    await leave.save();
    res.json({ message: 'Leave updated' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

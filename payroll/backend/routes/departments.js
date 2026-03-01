const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// GET all departments
router.get('/', async (req, res) => {
  try {
    const depts = await Department.find().sort({ created_at: -1 }).lean();
    res.json(depts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET department by id
router.get('/:id', async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id).lean();
    if (!dept) return res.status(404).json({ message: 'Department not found' });
    res.json(dept);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create department
router.post('/', async (req, res) => {
  try {
    const dept = new Department(req.body);
    await dept.save();
    res.json({ id: dept.id, message: 'Department created' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update department
router.put('/:id', async (req, res) => {
  try {
    const updated = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Department updated' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete department
router.delete('/:id', async (req, res) => {
  try {
    const del = await Department.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ message: 'Department deleted' });
    res.json({ message: 'Department deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
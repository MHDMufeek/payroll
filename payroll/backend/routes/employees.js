const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const emps = await Employee.find().sort({ created_at: -1 }).lean();
    res.json(emps);
  } catch (err) {
    console.error('GET /employees error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET employee by id
router.get('/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).lean();
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    console.error('GET /employees/:id error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Create employee
router.post('/', async (req, res) => {
  try {
    const emp = new Employee(req.body);
    const saved = await emp.save();
    console.log('Employee created:', saved._id, req.body.first_name, req.body.last_name);
    res.json({ id: emp.id, _id: emp._id, message: 'Employee created successfully' });
  } catch (err) {
    console.error('POST /employees error:', err.message, err.errors);
    res.status(500).json({ error: err.message, details: err.errors });
  }
});

// Update employee
router.put('/:id', async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Employee not found' });
    console.log('Employee updated:', req.params.id);
    res.json({ id: updated.id, message: 'Employee updated successfully' });
  } catch (err) {
    console.error('PUT /employees/:id error:', err.message);
    res.status(500).json({ error: err.message, details: err.errors });
  }
});

// Delete employee
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Employee not found' });
    console.log('Employee deleted:', req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('DELETE /employees/:id error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

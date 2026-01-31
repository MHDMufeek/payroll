const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all departments
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM departments ORDER BY created_at DESC';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// GET department by id
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM departments WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: 'Department not found' });
    res.json(result[0]);
  });
});

// Create department
router.post('/', (req, res) => {
  const { name, manager, employee_count, payroll_budget, status } = req.body;
  const sql = 'INSERT INTO departments (name, manager, employee_count, payroll_budget, status) VALUES (?,?,?,?,?)';
  db.query(sql, [name, manager, employee_count || 0, payroll_budget || 0, status || 'Active'], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, message: 'Department created' });
  });
});

// Update department
router.put('/:id', (req, res) => {
  const { name, manager, employee_count, payroll_budget, status } = req.body;
  const sql = 'UPDATE departments SET name = ?, manager = ?, employee_count = ?, payroll_budget = ?, status = ? WHERE id = ?';
  db.query(sql, [name, manager, employee_count || 0, payroll_budget || 0, status || 'Active', req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Department updated' });
  });
});

// Delete department
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM departments WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Department deleted' });
  });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET attendance list with optional filters
router.get('/', (req, res) => {
  const { startDate, endDate, employeeId, department, source } = req.query;
  let sql = 'SELECT * FROM attendance WHERE 1=1';
  const params = [];

  if (startDate) {
    sql += ' AND date >= ?';
    params.push(startDate);
  }
  if (endDate) {
    sql += ' AND date <= ?';
    params.push(endDate);
  }
  if (employeeId) {
    sql += ' AND employee_id = ?';
    params.push(employeeId);
  }
  if (department) {
    sql += ' AND department = ?';
    params.push(department);
  }
  if (source) {
    sql += ' AND source = ?';
    params.push(source);
  }

  sql += ' ORDER BY date DESC, id DESC';

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// GET single attendance by id
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM attendance WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: 'Attendance not found' });
    res.json(results[0]);
  });
});

// Create attendance record
router.post('/', (req, res) => {
  const a = req.body || {};
  const sql = `INSERT INTO attendance (employee_id, employee_name, date, check_in, check_out, working_hours, overtime, status, source, remarks, department, payroll_locked)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
  const values = [
    a.employeeId || a.employee_id || null,
    a.employeeName || a.employee_name || null,
    a.date || null,
    a.checkIn || a.check_in || null,
    a.checkOut || a.check_out || null,
    a.workingHours != null ? a.workingHours : (a.working_hours != null ? a.working_hours : 0),
    a.overtime != null ? a.overtime : (a.overtime != null ? a.overtime : 0),
    a.status || 'present',
    a.source || 'manual',
    a.remarks || null,
    a.department || null,
    a.payrollLocked ? 1 : 0
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, message: 'Attendance created' });
  });
});

// Update attendance
router.put('/:id', (req, res) => {
  const a = req.body || {};
  const sql = `UPDATE attendance SET employee_id = ?, employee_name = ?, date = ?, check_in = ?, check_out = ?, working_hours = ?, overtime = ?, status = ?, source = ?, remarks = ?, department = ?, payroll_locked = ? WHERE id = ?`;
  const values = [
    a.employeeId || a.employee_id || null,
    a.employeeName || a.employee_name || null,
    a.date || null,
    a.checkIn || a.check_in || null,
    a.checkOut || a.check_out || null,
    a.workingHours != null ? a.workingHours : (a.working_hours != null ? a.working_hours : 0),
    a.overtime != null ? a.overtime : (a.overtime != null ? a.overtime : 0),
    a.status || 'present',
    a.source || 'manual',
    a.remarks || null,
    a.department || null,
    a.payrollLocked ? 1 : 0,
    req.params.id
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Attendance updated' });
  });
});

// Delete attendance
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM attendance WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Attendance deleted' });
  });
});

module.exports = router;

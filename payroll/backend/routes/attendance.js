const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// GET attendance list with optional filters
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, employeeId, department, source } = req.query;
    const query = {};
    if (startDate) query.date = { ...query.date, $gte: new Date(startDate) };
    if (endDate) query.date = { ...query.date, $lte: new Date(endDate) };
    if (employeeId) query.employee_id = employeeId;
    if (department) query.department = department;
    if (source) query.source = source;

    const results = await Attendance.find(query).sort({ date: -1, _id: -1 }).lean();
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET single attendance by id
router.get('/:id', async (req, res) => {
  try {
    const att = await Attendance.findById(req.params.id).lean();
    if (!att) return res.status(404).json({ message: 'Attendance not found' });
    res.json(att);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create attendance record
router.post('/', async (req, res) => {
  try {
    const data = req.body || {};
    const a = new Attendance({
      employee_id: data.employeeId || data.employee_id,
      employee_name: data.employeeName || data.employee_name,
      date: data.date,
      check_in: data.checkIn || data.check_in,
      check_out: data.checkOut || data.check_out,
      working_hours: data.workingHours != null ? data.workingHours : (data.working_hours != null ? data.working_hours : 0),
      overtime: data.overtime != null ? data.overtime : (data.overtime != null ? data.overtime : 0),
      status: data.status || 'present',
      source: data.source || 'manual',
      remarks: data.remarks,
      department: data.department,
      payroll_locked: data.payrollLocked || false
    });
    await a.save();
    res.json({ id: a.id, message: 'Attendance created' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update attendance
router.put('/:id', async (req, res) => {
  try {
    const data = req.body || {};
    const updated = await Attendance.findByIdAndUpdate(req.params.id, {
      employee_id: data.employeeId || data.employee_id,
      employee_name: data.employeeName || data.employee_name,
      date: data.date,
      check_in: data.checkIn || data.check_in,
      check_out: data.checkOut || data.check_out,
      working_hours: data.workingHours != null ? data.workingHours : (data.working_hours != null ? data.working_hours : 0),
      overtime: data.overtime != null ? data.overtime : (data.overtime != null ? data.overtime : 0),
      status: data.status || 'present',
      source: data.source || 'manual',
      remarks: data.remarks,
      department: data.department,
      payroll_locked: data.payrollLocked || false
    }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Attendance not found' });
    res.json({ message: 'Attendance updated' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete attendance
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Attendance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Attendance not found' });
    res.json({ message: 'Attendance deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

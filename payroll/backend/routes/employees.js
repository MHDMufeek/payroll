const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all employees
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM employees ORDER BY created_at DESC';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// GET employee by id
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM employees WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: 'Employee not found' });
    res.json(result[0]);
  });
});

// Create employee
router.post('/', (req, res) => {
  const emp = req.body || {};

  const sql = `INSERT INTO employees (
    employee_id, first_name, last_name, name, email, mobile, department, position,
    hire_date, date_of_birth, gender, nic_number, basic_salary, allowances, gross_salary,
    status, epf_number, etf_number, bank_details, personal_info, qualifications,
    job_details, epf_etf, documents, skills
  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  const values = [
    emp.employeeId || emp.employee_id || null,
    emp.firstName || emp.first_name || null,
    emp.lastName || emp.last_name || null,
    emp.name || `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || null,
    emp.email || null,
    emp.mobile || emp.phone || null,
    emp.department || null,
    emp.position || emp.designation || null,
    emp.hireDate || emp.dateOfJoining || null,
    emp.dateOfBirth || null,
    emp.gender || null,
    emp.nicNumber || emp.nic_number || null,
    emp.basicSalary ? parseFloat(emp.basicSalary) : (emp.basic_salary ? parseFloat(emp.basic_salary) : null),
    emp.allowances ? parseFloat(emp.allowances) : (emp.allowances === 0 ? 0 : null),
    emp.grossSalary ? parseFloat(emp.grossSalary) : (emp.gross_salary ? parseFloat(emp.gross_salary) : null),
    emp.status || 'active',
    emp.epfNumber || emp.epf_number || null,
    emp.etfNumber || emp.etf_number || null,
    emp.bankDetails ? JSON.stringify(emp.bankDetails) : (emp.bank_details ? JSON.stringify(emp.bank_details) : null),
    emp.personalInfo ? JSON.stringify(emp.personalInfo) : (emp.personal_info ? JSON.stringify(emp.personal_info) : null),
    emp.qualifications ? JSON.stringify(emp.qualifications) : (emp.qualifications ? JSON.stringify(emp.qualifications) : null),
    emp.jobDetails ? JSON.stringify(emp.jobDetails) : (emp.job_details ? JSON.stringify(emp.job_details) : null),
    emp.epfEtf ? JSON.stringify(emp.epfEtf) : (emp.epf_etf ? JSON.stringify(emp.epf_etf) : null),
    emp.documents ? JSON.stringify(emp.documents) : null,
    emp.skills ? JSON.stringify(emp.skills) : (emp.skills ? JSON.stringify(emp.skills) : null)
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, message: 'Employee created' });
  });
});

// Update employee
router.put('/:id', (req, res) => {
  const emp = req.body || {};
  const id = req.params.id;

  const sql = `UPDATE employees SET
    employee_id = ?, first_name = ?, last_name = ?, name = ?, email = ?, mobile = ?, department = ?, position = ?,
    hire_date = ?, date_of_birth = ?, gender = ?, nic_number = ?, basic_salary = ?, allowances = ?, gross_salary = ?,
    status = ?, epf_number = ?, etf_number = ?, bank_details = ?, personal_info = ?, qualifications = ?,
    job_details = ?, epf_etf = ?, documents = ?, skills = ?
    WHERE id = ?`;

  const values = [
    emp.employeeId || emp.employee_id || null,
    emp.firstName || emp.first_name || null,
    emp.lastName || emp.last_name || null,
    emp.name || `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || null,
    emp.email || null,
    emp.mobile || emp.phone || null,
    emp.department || null,
    emp.position || emp.designation || null,
    emp.hireDate || emp.dateOfJoining || null,
    emp.dateOfBirth || null,
    emp.gender || null,
    emp.nicNumber || emp.nic_number || null,
    emp.basicSalary ? parseFloat(emp.basicSalary) : (emp.basic_salary ? parseFloat(emp.basic_salary) : null),
    emp.allowances ? parseFloat(emp.allowances) : (emp.allowances === 0 ? 0 : null),
    emp.grossSalary ? parseFloat(emp.grossSalary) : (emp.gross_salary ? parseFloat(emp.gross_salary) : null),
    emp.status || 'active',
    emp.epfNumber || emp.epf_number || null,
    emp.etfNumber || emp.etf_number || null,
    emp.bankDetails ? JSON.stringify(emp.bankDetails) : (emp.bank_details ? JSON.stringify(emp.bank_details) : null),
    emp.personalInfo ? JSON.stringify(emp.personalInfo) : (emp.personal_info ? JSON.stringify(emp.personal_info) : null),
    emp.qualifications ? JSON.stringify(emp.qualifications) : (emp.qualifications ? JSON.stringify(emp.qualifications) : null),
    emp.jobDetails ? JSON.stringify(emp.jobDetails) : (emp.job_details ? JSON.stringify(emp.job_details) : null),
    emp.epfEtf ? JSON.stringify(emp.epfEtf) : (emp.epf_etf ? JSON.stringify(emp.epf_etf) : null),
    emp.documents ? JSON.stringify(emp.documents) : null,
    emp.skills ? JSON.stringify(emp.skills) : (emp.skills ? JSON.stringify(emp.skills) : null),
    id
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Employee updated' });
  });
});

// Delete employee
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM employees WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Employee deleted' });
  });
});

module.exports = router;

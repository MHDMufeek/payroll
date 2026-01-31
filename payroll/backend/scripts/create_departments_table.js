const db = require('../db');

const sql = `CREATE TABLE IF NOT EXISTS departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  manager VARCHAR(150),
  employee_count INT DEFAULT 0,
  payroll_budget DECIMAL(12,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

db.query(sql, (err, result) => {
  if (err) {
    console.error('Failed to create departments table:', err.message || err);
    process.exit(1);
  }
  console.log('`departments` table ensured (created if missing).');
  process.exit(0);
});
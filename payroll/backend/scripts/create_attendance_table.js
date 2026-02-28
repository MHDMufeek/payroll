const db = require('../db');

const sql = `CREATE TABLE IF NOT EXISTS attendance (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  employee_id VARCHAR(64) NOT NULL,
  employee_name VARCHAR(200) NOT NULL,
  date DATE NOT NULL,
  check_in TIME DEFAULT NULL,
  check_out TIME DEFAULT NULL,
  working_hours DECIMAL(6,2) DEFAULT 0,
  overtime DECIMAL(6,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'present',
  source VARCHAR(50) DEFAULT 'biometric',
  remarks TEXT,
  department VARCHAR(100),
  payroll_locked TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

db.query(sql, (err, result) => {
  if (err) {
    console.error('Failed to create attendance table:', err.message || err);
    process.exit(1);
  }
  console.log('`attendance` table ensured (created if missing).');
  process.exit(0);
});

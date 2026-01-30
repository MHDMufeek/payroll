const db = require('../db');

const sql = `CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id VARCHAR(50) UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  name VARCHAR(200),
  email VARCHAR(150),
  mobile VARCHAR(50),
  department VARCHAR(100),
  position VARCHAR(100),
  hire_date DATE,
  date_of_birth DATE,
  gender VARCHAR(20),
  nic_number VARCHAR(50),
  basic_salary DECIMAL(12,2),
  allowances DECIMAL(12,2),
  gross_salary DECIMAL(12,2),
  status VARCHAR(50) DEFAULT 'active',
  epf_number VARCHAR(100),
  etf_number VARCHAR(100),
  bank_details JSON,
  personal_info JSON,
  qualifications JSON,
  job_details JSON,
  epf_etf JSON,
  documents JSON,
  skills JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

db.query(sql, (err, result) => {
  if (err) {
    console.error('Failed to create employees table:', err.message || err);
    process.exit(1);
  }
  console.log('`employees` table ensured (created if missing).');
  process.exit(0);
});

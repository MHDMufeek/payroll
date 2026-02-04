const db = require('../db');

const sql = `CREATE TABLE IF NOT EXISTS leaves (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200),
  emp_id VARCHAR(100),
  email VARCHAR(150),
  from_date DATE,
  to_date DATE,
  reason TEXT,
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  processed_by INT NULL,
  processed_at TIMESTAMP NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

db.query(sql, (err, result) => {
  if (err) {
    console.error('Failed to create leaves table:', err.message || err);
    process.exit(1);
  }
  console.log('`leaves` table ensured (created if missing).');
  process.exit(0);
});

const db = require('../db');

// WARNING: This script will remove all rows from the `employees` table.
// Run only when you want to permanently delete example/demo employee rows.

const queries = [
  'TRUNCATE TABLE employees',
  "ALTER TABLE employees AUTO_INCREMENT = 1"
];

db.connect((err) => {
  if (err) {
    console.error('DB connect error:', err.message || err);
    process.exit(1);
  }

  const run = async () => {
    for (const q of queries) {
      try {
        await new Promise((resolve, reject) => {
          db.query(q, (err) => (err ? reject(err) : resolve()));
        });
        console.log('Executed:', q);
      } catch (err) {
        console.error('Failed query:', q, err.message || err);
        process.exit(1);
      }
    }
    console.log('Example data cleared from `employees`.');
    process.exit(0);
  };

  run();
});

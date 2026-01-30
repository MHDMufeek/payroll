const db = require('../db');

db.query("SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = ?", ['mypayroll'], (err, results) => {
  if (err) {
    console.error('Error querying information_schema:', err.message || err);
    process.exit(1);
  }

  if (!results || results.length === 0) {
    console.log('No tables found in database `mypayroll`.');
  } else {
    console.log('Tables in `mypayroll`:');
    results.forEach(r => console.log('-', r.TABLE_NAME));
  }
  process.exit(0);
});

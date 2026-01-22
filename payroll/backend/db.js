const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",      // your MySQL password (leave empty if no password)
  database: "mydb"   // your database name
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("MySQL connected ✅");
  }
});

module.exports = db;

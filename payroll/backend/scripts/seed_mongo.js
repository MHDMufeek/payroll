// run with `node scripts/seed_mongo.js` to populate MongoDB with example data
const mongoose = require('../db');
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');
const Department = require('../models/Department');
const Leave = require('../models/Leave');
const Attendance = require('../models/Attendance');
const User = require('../models/User');

async function seed() {
  try {
    // clear existing collections
    await Promise.all([
      Employee.deleteMany({}),
      Department.deleteMany({}),
      Leave.deleteMany({}),
      Attendance.deleteMany({}),
      User.deleteMany({})
    ]);

    // add HR admin
    const admin = new User({ username: 'admin', email: 'admin@company.com', password: await bcrypt.hash('password', 10) });
    await admin.save();

    // sample department
    const dept = await Department.create({ name: 'IT', manager: 'John Doe', employee_count: 5, payroll_budget: 100000 });

    // sample employees
    const emp1 = await Employee.create({ name: 'John Doe', email: 'john@company.com', department: 'IT', position: 'Developer' });
    const emp2 = await Employee.create({ name: 'Jane Smith', email: 'jane@company.com', department: 'IT', position: 'Designer' });

    // sample leaves
    await Leave.create({ name: 'Jane Smith', emp_id: emp2.id, email: emp2.email, from_date: new Date(), to_date: new Date(), reason: 'Sick' });

    // sample attendance
    await Attendance.create({ employee_id: emp1.id, employee_name: emp1.name, date: new Date(), status: 'present' });

    console.log('MongoDB seeded');
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
}

seed();
CREATE DATABASE IF NOT EXISTS mypayroll;
USE mypayroll;

CREATE TABLE hr_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO hr_users (username, password, email)
VALUES (
  'admin',
  '$2b$10$vQVcqzZ0weZxPSjBReY47ueSwztBYP/usZ.jQ2wPTFBMWFJJbvFn.',
  'admin@company.com'
);

-- Employees table to support Employees page
CREATE TABLE IF NOT EXISTS employees (
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
);

-- Departments table to support Department page
CREATE TABLE IF NOT EXISTS departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  manager VARCHAR(150),
  employee_count INT DEFAULT 0,
  payroll_budget DECIMAL(12,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leaves table to support Apply Leave page
CREATE TABLE IF NOT EXISTS leaves (
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
);

-- Sample employees
-- (Removed sample INSERTs to clear example data)

-- Attendance table to support Attendance page
CREATE TABLE IF NOT EXISTS attendance (
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
);

-- Example attendance rows (small dataset for initial testing)
INSERT INTO attendance (employee_id, employee_name, date, check_in, check_out, working_hours, overtime, status, source, remarks, department, payroll_locked) VALUES
  ('001', 'John Doe', '2024-01-15', '08:55:00', '17:10:00', 8.25, 0.25, 'present', 'biometric', '', 'IT', 0),
  ('002', 'Jane Smith', '2024-01-15', '09:15:00', '17:05:00', 7.83, 0.00, 'late', 'hybrid', 'Manual override - forgot to punch out', 'HR', 0),
  ('003', 'Bob Johnson', '2024-01-15', NULL, NULL, 0.00, 0.00, 'absent', 'manual', 'Sick leave', 'Finance', 1);


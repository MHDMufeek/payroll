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

-- Sample employees
-- (Removed sample INSERTs to clear example data)

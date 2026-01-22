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

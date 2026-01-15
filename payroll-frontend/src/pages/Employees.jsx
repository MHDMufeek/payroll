import React, { useState } from 'react';
import TopNav from "../components/TopNav";

const Employees = () => {
  // Mock employee data
  const initialEmployees = [
    {
      id: 1,
      name: 'John Smith',
      position: 'Senior Developer',
      department: 'Engineering',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      status: 'active',
      hireDate: '2020-03-15',
      salary: '$95,000',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      projects: 12,
      performance: 4.8
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Product Manager',
      department: 'Product',
      email: 'sarah.j@company.com',
      phone: '+1 (555) 234-5678',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      status: 'active',
      hireDate: '2019-07-22',
      salary: '$110,000',
      skills: ['Product Strategy', 'Agile', 'User Research'],
      projects: 8,
      performance: 4.9
    },
    {
      id: 3,
      name: 'Mike Chen',
      position: 'UX Designer',
      department: 'Design',
      email: 'mike.chen@company.com',
      phone: '+1 (555) 345-6789',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      status: 'on-leave',
      hireDate: '2021-05-10',
      salary: '$85,000',
      skills: ['Figma', 'User Testing', 'Prototyping'],
      projects: 15,
      performance: 4.7
    },
    {
      id: 4,
      name: 'Emma Wilson',
      position: 'Marketing Lead',
      department: 'Marketing',
      email: 'emma.w@company.com',
      phone: '+1 (555) 456-7890',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      status: 'active',
      hireDate: '2022-01-30',
      salary: '$90,000',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy'],
      projects: 7,
      performance: 4.6
    },
    {
      id: 5,
      name: 'David Brown',
      position: 'DevOps Engineer',
      department: 'Engineering',
      email: 'david.b@company.com',
      phone: '+1 (555) 567-8901',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      status: 'active',
      hireDate: '2020-11-05',
      salary: '$105,000',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      projects: 10,
      performance: 4.8
    },
    {
      id: 6,
      name: 'Lisa Taylor',
      position: 'HR Manager',
      department: 'Human Resources',
      email: 'lisa.t@company.com',
      phone: '+1 (555) 678-9012',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      status: 'active',
      hireDate: '2018-09-12',
      salary: '$88,000',
      skills: ['Recruitment', 'Employee Relations', 'Training'],
      projects: 9,
      performance: 4.9
    },
    {
      id: 7,
      name: 'Robert Kim',
      position: 'Frontend Developer',
      department: 'Engineering',
      email: 'robert.k@company.com',
      phone: '+1 (555) 789-0123',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
      status: 'active',
      hireDate: '2023-02-15',
      salary: '$80,000',
      skills: ['React', 'Next.js', 'Tailwind', 'JavaScript'],
      projects: 6,
      performance: 4.5
    },
    {
      id: 8,
      name: 'Maria Garcia',
      position: 'Sales Executive',
      department: 'Sales',
      email: 'maria.g@company.com',
      phone: '+1 (555) 890-1234',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      status: 'active',
      hireDate: '2021-08-20',
      salary: '$75,000',
      skills: ['Sales', 'CRM', 'Negotiation'],
      projects: 11,
      performance: 4.7
    }
  ];

  // State Management
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name');
  
  // Form state for editing employee
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: 'Engineering',
    email: '',
    phone: '',
    status: 'active',
    hireDate: new Date().toISOString().split('T')[0],
    salary: '',
    skills: '',
    performance: '4.0',
    projects: '0'
  });

  // New registration form states
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registrationFormData, setRegistrationFormData] = useState({
    // REGISTER HERE
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion1: '',
    securityAnswer1: '',
    securityQuestion2: '',
    securityAnswer2: '',
    address: '',
    
    // YOUR DETAILS
    firstName: '',
    lastName: '',
    relocationRequired: 'NO',
    country: '',
    phoneNumber: '',
    dateOfBirth: '',
    
    // QUALIFICATIONS
    university: '',
    highestQualification: '',
    gradePoints: '',
    resumeFile: null,
    
    // NEW FIELDS: EPF/ETF
    epfStatus: 'active',
    etfStatus: 'active',
    
    // JOB DETAILS
    jobCategory: '',
    jobDesignation: '',
    employeeType: 'full-time',
    
    // BANK DETAILS
    bankName: '',
    accountNumber: '',
    accountType: 'savings',
    branch: '',
    bankCode: ''
  });

  // Security questions options
  const securityQuestions = [
    'What was your first pet\'s name?',
    'What is your mother\'s maiden name?',
    'What city were you born in?',
    'What was your first car?',
    'What is your favorite book?',
    'What is your childhood nickname?'
  ];

  // Countries list
  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'India',
    'Japan',
    'China',
    'Brazil',
    'Sri Lanka'
  ];

  // Universities list
  const universities = [
    'Harvard University',
    'Stanford University',
    'MIT',
    'University of Cambridge',
    'University of Oxford',
    'University of Toronto',
    'National University of Singapore',
    'University of Melbourne',
    'University of Tokyo',
    'University of Colombo',
    'University of Moratuwa',
    'Other'
  ];

  // Qualifications list
  const qualifications = [
    'High School',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctorate',
    'Professional Certificate',
    'Diploma'
  ];

  // Job Categories
  const jobCategories = [
    'Information Technology',
    'Engineering',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations',
    'Customer Service',
    'Research & Development',
    'Administration'
  ];

  // Job Designations
  const jobDesignations = [
    'Software Engineer',
    'Senior Software Engineer',
    'Team Lead',
    'Project Manager',
    'Product Manager',
    'UX Designer',
    'DevOps Engineer',
    'Data Scientist',
    'Business Analyst',
    'Marketing Executive',
    'Sales Executive',
    'HR Executive',
    'Finance Manager',
    'Operations Manager'
  ];

  // Employee Types
  const employeeTypes = [
    'full-time',
    'part-time',
    'contract',
    'temporary',
    'intern',
    'freelance'
  ];

  // Bank Names
  const bankNames = [
    'Bank of America',
    'Chase Bank',
    'Wells Fargo',
    'Citibank',
    'HSBC',
    'Standard Chartered',
    'Commercial Bank',
    'People\'s Bank',
    'Hatton National Bank',
    'Sampath Bank',
    'Other'
  ];

  // Account Types
  const accountTypes = [
    'savings',
    'checking',
    'current',
    'salary',
    'fixed deposit'
  ];

  // Get unique departments for filters
  const departments = ['all', ...new Set(employees.map(emp => emp.department))];

  // Available departments for form
  const availableDepartments = [
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations'
  ];

  // Filter and sort employees
  const filteredEmployees = employees
    .filter(employee => {
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = 
        selectedDepartment === 'all' || employee.department === selectedDepartment;
      
      return matchesSearch && matchesDepartment;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'department':
          return a.department.localeCompare(b.department);
        case 'hireDate':
          return new Date(b.hireDate) - new Date(a.hireDate);
        case 'salary':
          return parseInt(b.salary.replace(/[$,]/g, '')) - parseInt(a.salary.replace(/[$,]/g, ''));
        default:
          return 0;
      }
    });

  // Statistics
  const stats = {
    total: employees.length,
    active: employees.filter(emp => emp.status === 'active').length,
    departments: [...new Set(employees.map(emp => emp.department))].length,
    avgPerformance: (employees.reduce((acc, emp) => acc + emp.performance, 0) / employees.length).toFixed(1)
  };

  // Event Handlers for editing employee
  const handleEditEmployee = (e) => {
    e.preventDefault();
    
    // Process skills string into array
    const skillsArray = formData.skills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);

    const updatedEmployee = {
      ...selectedEmployee,
      name: formData.name,
      position: formData.position,
      department: formData.department,
      email: formData.email,
      phone: formData.phone,
      status: formData.status,
      hireDate: formData.hireDate,
      salary: formData.salary ? `$${parseInt(formData.salary).toLocaleString()}` : '$0',
      skills: skillsArray,
      projects: parseInt(formData.projects) || 0,
      performance: parseFloat(formData.performance) || 4.0
    };

    setEmployees(employees.map(emp => 
      emp.id === selectedEmployee.id ? updatedEmployee : emp
    ));
    
    setSelectedEmployee(updatedEmployee);
    resetForm();
    setIsEditModalOpen(false);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
      if (selectedEmployee && selectedEmployee.id === id) {
        setSelectedEmployee(null);
      }
    }
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      position: employee.position,
      department: employee.department,
      email: employee.email,
      phone: employee.phone,
      status: employee.status,
      hireDate: employee.hireDate,
      salary: employee.salary.replace(/[$,]/g, ''),
      skills: employee.skills.join(', '),
      performance: employee.performance.toString(),
      projects: employee.projects.toString()
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      department: 'Engineering',
      email: '',
      phone: '',
      status: 'active',
      hireDate: new Date().toISOString().split('T')[0],
      salary: '',
      skills: '',
      performance: '4.0',
      projects: '0'
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Event Handlers for registration form
  const handleRegistrationFormChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    
    if (type === 'file') {
      setRegistrationFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (type === 'checkbox') {
      setRegistrationFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setRegistrationFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (registrationFormData.password !== registrationFormData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!registrationFormData.resumeFile) {
      alert('Please upload a resume file');
      return;
    }

    // Process the form data
    console.log('Registration Data:', registrationFormData);
    
    // Create a new employee from registration data
    const maxId = Math.max(...employees.map(emp => emp.id));
    const newEmployee = {
      id: maxId + 1,
      name: `${registrationFormData.firstName} ${registrationFormData.lastName}`,
      position: registrationFormData.jobDesignation || 'New Employee',
      department: registrationFormData.jobCategory || 'To be Assigned',
      email: registrationFormData.email,
      phone: registrationFormData.phoneNumber,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${registrationFormData.firstName}`,
      status: 'active',
      hireDate: new Date().toISOString().split('T')[0],
      salary: '$50,000',
      skills: [registrationFormData.highestQualification],
      projects: 0,
      performance: 4.0,
      // Additional fields
      epfStatus: registrationFormData.epfStatus,
      etfStatus: registrationFormData.etfStatus,
      employeeType: registrationFormData.employeeType,
      bankDetails: {
        bankName: registrationFormData.bankName,
        accountNumber: registrationFormData.accountNumber,
        accountType: registrationFormData.accountType,
        branch: registrationFormData.branch
      }
    };

    setEmployees([...employees, newEmployee]);
    
    // Reset form and close modal
    resetRegistrationForm();
    setIsRegistrationModalOpen(false);
    alert('Employee registered successfully!');
  };

  const resetRegistrationForm = () => {
    setRegistrationFormData({
      // REGISTER HERE
      email: '',
      password: '',
      confirmPassword: '',
      securityQuestion1: '',
      securityAnswer1: '',
      securityQuestion2: '',
      securityAnswer2: '',
      address: '',
      
      // YOUR DETAILS
      firstName: '',
      lastName: '',
      relocationRequired: 'NO',
      country: '',
      phoneNumber: '',
      dateOfBirth: '',
      
      // QUALIFICATIONS
      university: '',
      highestQualification: '',
      gradePoints: '',
      resumeFile: null,
      
      // NEW FIELDS: EPF/ETF
      epfStatus: 'active',
      etfStatus: 'active',
      
      // JOB DETAILS
      jobCategory: '',
      jobDesignation: '',
      employeeType: 'full-time',
      
      // BANK DETAILS
      bankName: '',
      accountNumber: '',
      accountType: 'savings',
      branch: '',
      bankCode: ''
    });
  };

  // Employee Card Component
  const EmployeeCard = ({ employee, onView, onEdit, onDelete }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{employee.name}</h3>
              <p className="text-sm text-gray-600">{employee.position}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                  {employee.department}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  employee.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {employee.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onView}
              className="text-blue-600 hover:text-blue-800"
              title="View Details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button
              onClick={onEdit}
              className="text-green-600 hover:text-green-800"
              title="Edit"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800"
              title="Delete"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{employee.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Joined {new Date(employee.hireDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {employee.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"
              >
                {skill}
              </span>
            ))}
            {employee.skills.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium text-gray-500">
                +{employee.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Employee Detail Modal Component
  const EmployeeModal = ({ employee, onClose, onEdit, onDelete }) => {
    if (!employee) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
                <p className="text-gray-600">{employee.position}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="md:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{employee.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Department & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Department</h4>
                    <p className="font-medium text-gray-900">{employee.department}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                    <span className={`px-2 py-1 text-sm font-medium rounded-full ${
                      employee.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.status}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Hire Date</h4>
                    <p className="font-medium text-gray-900">
                      {new Date(employee.hireDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Salary</h4>
                    <p className="font-medium text-gray-900">{employee.salary}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="mt-4 text-center">
                    <div className="text-lg font-semibold text-gray-900">{employee.name}</div>
                    <div className="text-gray-600">{employee.position}</div>
                  </div>
                </div>

                {/* Performance */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Performance</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-700">{employee.performance}</div>
                    <div className="text-gray-600">/ 5.0</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {employee.projects} projects completed
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      onEdit();
                      onClose();
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Edit Employee
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this employee?')) {
                        onDelete(employee.id);
                        onClose();
                      }
                    }}
                    className="w-full border border-red-300 text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors"
                  >
                    Delete Employee
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Employee Form Modal Component (Used for editing only)
  const EmployeeFormModal = ({ isOpen, onClose, onSubmit, title }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <p className="text-gray-600 mt-1">Fill in the employee details below</p>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Personal Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position *
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter position"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {availableDepartments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="on-leave">On Leave</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Contact Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hire Date *
                    </label>
                    <input
                      type="date"
                      name="hireDate"
                      value={formData.hireDate}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleFormChange}
                        className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter annual salary"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills & Performance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., React, Node.js, TypeScript"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Performance (0-5)
                    </label>
                    <input
                      type="number"
                      name="performance"
                      value={formData.performance}
                      onChange={handleFormChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Projects Completed
                    </label>
                    <input
                      type="number"
                      name="projects"
                      value={formData.projects}
                      onChange={handleFormChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Registration Form Modal Component
  const RegistrationFormModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Employee Registration</h2>
                <p className="text-gray-600 mt-1">Complete the form below to register a new employee</p>
              </div>
              <button
                onClick={() => {
                  resetRegistrationForm();
                  onClose();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleRegistrationSubmit}>
              {/* REGISTER HERE Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  REGISTER HERE
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={registrationFormData.email}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={registrationFormData.password}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={registrationFormData.confirmPassword}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>

                {/* Security Questions */}
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Security Questions</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Security Question 1
                      </label>
                      <select
                        name="securityQuestion1"
                        value={registrationFormData.securityQuestion1}
                        onChange={handleRegistrationFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a security question</option>
                        {securityQuestions.map((question, index) => (
                          <option key={index} value={question}>{question}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        name="securityAnswer1"
                        value={registrationFormData.securityAnswer1}
                        onChange={handleRegistrationFormChange}
                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your answer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Security Question 2
                      </label>
                      <select
                        name="securityQuestion2"
                        value={registrationFormData.securityQuestion2}
                        onChange={handleRegistrationFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a security question</option>
                        {securityQuestions.map((question, index) => (
                          <option key={index} value={question}>{question}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        name="securityAnswer2"
                        value={registrationFormData.securityAnswer2}
                        onChange={handleRegistrationFormChange}
                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your answer"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={registrationFormData.address}
                    onChange={handleRegistrationFormChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full address"
                  />
                </div>
              </div>

              {/* YOUR DETAILS Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  YOUR DETAILS
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={registrationFormData.firstName}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={registrationFormData.lastName}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                {/* Relocation Required */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relocation Required *
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="relocationRequired"
                        value="YES"
                        checked={registrationFormData.relocationRequired === 'YES'}
                        onChange={handleRegistrationFormChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">YES</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="relocationRequired"
                        value="NO"
                        checked={registrationFormData.relocationRequired === 'NO'}
                        onChange={handleRegistrationFormChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">NO</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={registrationFormData.country}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={registrationFormData.phoneNumber}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={registrationFormData.dateOfBirth}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* QUALIFICATIONS Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  QUALIFICATIONS
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select University *
                    </label>
                    <select
                      name="university"
                      value={registrationFormData.university}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select university</option>
                      {universities.map((university, index) => (
                        <option key={index} value={university}>{university}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Highest Qualification *
                    </label>
                    <select
                      name="highestQualification"
                      value={registrationFormData.highestQualification}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select qualification</option>
                      {qualifications.map((qualification, index) => (
                        <option key={index} value={qualification}>{qualification}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade Points *
                    </label>
                    <input
                      type="text"
                      name="gradePoints"
                      value={registrationFormData.gradePoints}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 3.8/4.0 or 85%"
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Resume/CV *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="mb-4">
                      <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div className="flex items-center justify-center">
                      <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                        Choose Files
                        <input
                          type="file"
                          name="resumeFile"
                          onChange={handleRegistrationFormChange}
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          required
                        />
                      </label>
                      <span className="ml-3 text-gray-600">
                        {registrationFormData.resumeFile ? registrationFormData.resumeFile.name : 'No file chosen'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">or drag and drop files here</p>
                    <p className="text-xs text-gray-400 mt-2">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* EPF/ETF Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  EPF/ETF DETAILS
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EPF Status *
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="epfStatus"
                          value="active"
                          checked={registrationFormData.epfStatus === 'active'}
                          onChange={handleRegistrationFormChange}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-3 text-gray-700">Active</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="epfStatus"
                          value="inactive"
                          checked={registrationFormData.epfStatus === 'inactive'}
                          onChange={handleRegistrationFormChange}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-3 text-gray-700">Inactive</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ETF Status *
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="etfStatus"
                          value="active"
                          checked={registrationFormData.etfStatus === 'active'}
                          onChange={handleRegistrationFormChange}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-3 text-gray-700">Active</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="etfStatus"
                          value="inactive"
                          checked={registrationFormData.etfStatus === 'inactive'}
                          onChange={handleRegistrationFormChange}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-3 text-gray-700">Inactive</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* JOB DETAILS Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  JOB DETAILS
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Category *
                    </label>
                    <select
                      name="jobCategory"
                      value={registrationFormData.jobCategory}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select job category</option>
                      {jobCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Designation *
                    </label>
                    <select
                      name="jobDesignation"
                      value={registrationFormData.jobDesignation}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select designation</option>
                      {jobDesignations.map((designation, index) => (
                        <option key={index} value={designation}>{designation}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee Type *
                    </label>
                    <select
                      name="employeeType"
                      value={registrationFormData.employeeType}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {employeeTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* BANK DETAILS Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  BANK DETAILS
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name *
                    </label>
                    <select
                      name="bankName"
                      value={registrationFormData.bankName}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select bank</option>
                      {bankNames.map((bank, index) => (
                        <option key={index} value={bank}>{bank}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={registrationFormData.accountNumber}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter account number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Type *
                    </label>
                    <select
                      name="accountType"
                      value={registrationFormData.accountType}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {accountTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Branch *
                    </label>
                    <input
                      type="text"
                      name="branch"
                      value={registrationFormData.branch}
                      onChange={handleRegistrationFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter branch name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Code
                    </label>
                    <input
                      type="text"
                      name="bankCode"
                      value={registrationFormData.bankCode}
                      onChange={handleRegistrationFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter bank code"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    resetRegistrationForm();
                    onClose();
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={resetRegistrationForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Employee Directory</h1>
              <p className="text-gray-600 mt-1 md:mt-2">Manage your team members and their information</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Registration Button */}
              <button
                onClick={() => setIsRegistrationModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm md:text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Register Employee
              </button>
              
              {/* View Mode Toggle */}
              <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Employees</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{stats.departments}</div>
              <div className="text-sm text-gray-600">Departments</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">{stats.avgPerformance}</div>
              <div className="text-sm text-gray-600">Avg Performance</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search employees by name, position, or email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="department">Sort by Department</option>
              <option value="hireDate">Sort by Hire Date</option>
              <option value="salary">Sort by Salary</option>
            </select>
          </div>
        </div>

        {/* Employee Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredEmployees.map(employee => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onView={() => setSelectedEmployee(employee)}
                onEdit={() => handleEditClick(employee)}
                onDelete={() => handleDeleteEmployee(employee.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEmployees.map(employee => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img src={employee.avatar} alt={employee.name} className="w-10 h-10 rounded-full" />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                        {employee.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{employee.position}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        employee.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedEmployee(employee)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditClick(employee)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* No Results */}
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onEdit={() => handleEditClick(selectedEmployee)}
          onDelete={handleDeleteEmployee}
        />
      )}

      {/* Edit Employee Modal */}
      <EmployeeFormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          resetForm();
          setIsEditModalOpen(false);
        }}
        onSubmit={handleEditEmployee}
        title="Edit Employee"
      />

      {/* Registration Form Modal */}
      <RegistrationFormModal
        isOpen={isRegistrationModalOpen}
        onClose={() => {
          resetRegistrationForm();
          setIsRegistrationModalOpen(false);
        }}
      />
    </div>
  );
};

export default Employees;
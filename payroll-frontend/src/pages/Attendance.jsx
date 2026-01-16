import React, { useState, useEffect } from 'react';
import TopNav from "../components/TopNav";
import { useTheme } from "../context/ThemeContext";

const AttendancePage = () => {
  const { isDark } = useTheme();
  // State for filters
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [attendanceSource, setAttendanceSource] = useState('all');
  
  // State for data
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [biometricLogs, setBiometricLogs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  
  // State for modals
  const [showImportModal, setShowImportModal] = useState(false);
  const [showManualEntryModal, setShowManualEntryModal] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  
  // Manual entry form state
  const [manualEntry, setManualEntry] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    checkIn: '09:00',
    checkOut: '17:00',
    workingHours: 8,
    overtime: 0,
    source: 'manual',
    reason: '',
    approver: '',
    status: 'present'
  });

  // Process biometric logs form
  const [processForm, setProcessForm] = useState({
    date: new Date().toISOString().split('T')[0],
    processType: 'daily',
    overrideExisting: false
  });

  // Initial data (would come from API in real app)
  useEffect(() => {
    // Mock data
    const mockEmployees = [
      { id: '001', name: 'John Doe', department: 'IT', email: 'john@company.com' },
      { id: '002', name: 'Jane Smith', department: 'HR', email: 'jane@company.com' },
      { id: '003', name: 'Bob Johnson', department: 'Finance', email: 'bob@company.com' },
    ];
    
    const mockAttendance = [
      {
        id: '1',
        employeeId: '001',
        employeeName: 'John Doe',
        date: '2024-01-15',
        checkIn: '08:55',
        checkOut: '17:10',
        workingHours: 8.25,
        overtime: 0.25,
        status: 'present',
        source: 'biometric',
        remarks: '',
        department: 'IT',
        payrollLocked: false
      },
      {
        id: '2',
        employeeId: '002',
        employeeName: 'Jane Smith',
        date: '2024-01-15',
        checkIn: '09:15',
        checkOut: '17:05',
        workingHours: 7.83,
        overtime: 0,
        status: 'late',
        source: 'hybrid',
        remarks: 'Manual override - forgot to punch out',
        department: 'HR',
        payrollLocked: false
      },
      {
        id: '3',
        employeeId: '003',
        employeeName: 'Bob Johnson',
        date: '2024-01-15',
        checkIn: '',
        checkOut: '',
        workingHours: 0,
        overtime: 0,
        status: 'absent',
        source: 'manual',
        remarks: 'Sick leave',
        department: 'Finance',
        payrollLocked: true
      },
    ];

    const mockBiometricLogs = [
      { id: '1', employeeId: '001', timestamp: '2024-01-15 08:55:00', event: 'IN', device: 'FP-01' },
      { id: '2', employeeId: '001', timestamp: '2024-01-15 12:00:00', event: 'OUT', device: 'FP-01' },
      { id: '3', employeeId: '001', timestamp: '2024-01-15 13:00:00', event: 'IN', device: 'FP-01' },
      { id: '4', employeeId: '001', timestamp: '2024-01-15 17:10:00', event: 'OUT', device: 'FP-01' },
    ];

    setEmployees(mockEmployees);
    setAttendanceRecords(mockAttendance);
    setBiometricLogs(mockBiometricLogs);
    setDepartments(['IT', 'HR', 'Finance', 'Sales', 'Operations']);
  }, []);

  // Handle file import
  const handleFileImport = (file) => {
    // Process file based on type (CSV, Excel, DAT)
    console.log('Importing file:', file);
    // In real app: parse file and add to biometricLogs
  };

  // Process attendance from biometric logs
  const processAttendance = () => {
    // Group biometric logs by employee and date
    const groupedLogs = biometricLogs.reduce((acc, log) => {
      const date = log.timestamp.split(' ')[0];
      const key = `${log.employeeId}-${date}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(log);
      return acc;
    }, {});

    // Process each group
    Object.keys(groupedLogs).forEach(key => {
      const logs = groupedLogs[key];
      const [employeeId, date] = key.split('-');
      
      // Find employee
      const employee = employees.find(e => e.id === employeeId);
      if (!employee) return;

      // Sort logs by timestamp
      logs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      // Find first IN and last OUT
      const firstIn = logs.find(log => log.event === 'IN');
      const lastOut = logs.reverse().find(log => log.event === 'OUT');
      
      if (firstIn && lastOut) {
        const checkInTime = firstIn.timestamp.split(' ')[1];
        const checkOutTime = lastOut.timestamp.split(' ')[1];
        
        // Calculate working hours
        const checkIn = new Date(`1970-01-01T${checkInTime}`);
        const checkOut = new Date(`1970-01-01T${checkOutTime}`);
        const workingHours = (checkOut - checkIn) / (1000 * 60 * 60) - 1; // Subtract lunch
        const overtime = Math.max(0, workingHours - 8);
        
        // Create attendance record
        const newRecord = {
          id: Date.now().toString(),
          employeeId,
          employeeName: employee.name,
          date,
          checkIn: checkInTime.substring(0, 5),
          checkOut: checkOutTime.substring(0, 5),
          workingHours: parseFloat(workingHours.toFixed(2)),
          overtime: parseFloat(overtime.toFixed(2)),
          status: workingHours >= 8 ? 'present' : workingHours >= 4 ? 'half-day' : 'absent',
          source: 'biometric',
          remarks: '',
          department: employee.department,
          payrollLocked: false
        };

        // Check if record exists
        const existingIndex = attendanceRecords.findIndex(r => 
          r.employeeId === employeeId && r.date === date
        );

        if (existingIndex >= 0 && processForm.overrideExisting) {
          // Update existing record
          const updatedRecords = [...attendanceRecords];
          updatedRecords[existingIndex] = {
            ...updatedRecords[existingIndex],
            ...newRecord,
            source: 'hybrid',
            remarks: updatedRecords[existingIndex].remarks || 'Auto-processed from biometric'
          };
          setAttendanceRecords(updatedRecords);
          logAudit('UPDATE', `Updated attendance for ${employee.name} on ${date}`);
        } else if (existingIndex === -1) {
          // Add new record
          setAttendanceRecords(prev => [...prev, newRecord]);
          logAudit('CREATE', `Created biometric attendance for ${employee.name} on ${date}`);
        }
      }
    });

    setShowProcessModal(false);
  };

  // Handle manual entry
  const handleManualEntry = () => {
    const employee = employees.find(e => e.id === manualEntry.employeeId);
    if (!employee) return;

    const newRecord = {
      id: Date.now().toString(),
      employeeId: manualEntry.employeeId,
      employeeName: employee.name,
      date: manualEntry.date,
      checkIn: manualEntry.checkIn,
      checkOut: manualEntry.checkOut,
      workingHours: manualEntry.workingHours,
      overtime: manualEntry.overtime,
      status: manualEntry.status,
      source: manualEntry.source,
      remarks: manualEntry.reason,
      department: employee.department,
      payrollLocked: false,
      approvedBy: manualEntry.approver
    };

    // Check if biometric record exists
    const biometricExists = attendanceRecords.some(r => 
      r.employeeId === manualEntry.employeeId && 
      r.date === manualEntry.date && 
      r.source === 'biometric'
    );

    if (biometricExists) {
      // If overriding biometric, require reason and approver
      if (!manualEntry.reason || !manualEntry.approver) {
        alert('Reason and approver required for overriding biometric data');
        return;
      }
      newRecord.source = 'hybrid';
    }

    setAttendanceRecords(prev => [...prev, newRecord]);
    logAudit('CREATE', `Manual attendance entry for ${employee.name} on ${manualEntry.date}`);
    setShowManualEntryModal(false);
  };

  // Audit log function
  const logAudit = (action, description) => {
    const auditEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      action,
      description,
      userId: 'current-user', // Would be actual user from auth
      ipAddress: '127.0.0.1'
    };
    setAuditLogs(prev => [auditEntry, ...prev]);
  };

  // Filter attendance records
  const filteredRecords = attendanceRecords.filter(record => {
    const matchesDate = (!dateRange.startDate || record.date >= dateRange.startDate) &&
                       (!dateRange.endDate || record.date <= dateRange.endDate);
    const matchesEmployee = !selectedEmployee || record.employeeId === selectedEmployee;
    const matchesDepartment = !selectedDepartment || record.department === selectedDepartment;
    const matchesSource = attendanceSource === 'all' || record.source === attendanceSource;
    
    return matchesDate && matchesEmployee && matchesDepartment && matchesSource;
  });

  // Calculate summary statistics
  const summaryStats = {
    totalPresent: filteredRecords.filter(r => r.status === 'present').length,
    totalLate: filteredRecords.filter(r => r.status === 'late').length,
    totalAbsent: filteredRecords.filter(r => r.status === 'absent').length,
    totalWorkingHours: filteredRecords.reduce((sum, r) => sum + r.workingHours, 0),
    totalOvertime: filteredRecords.reduce((sum, r) => sum + r.overtime, 0),
    biometricCount: filteredRecords.filter(r => r.source === 'biometric').length,
    manualCount: filteredRecords.filter(r => r.source === 'manual').length,
    hybridCount: filteredRecords.filter(r => r.source === 'hybrid').length,
  };

  return (
    <div className={isDark ? "min-h-screen bg-gray-900" : "min-h-screen bg-gray-50"}>
      <TopNav />
      
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className={isDark ? "text-2xl md:text-3xl font-bold text-white mb-2" : "text-2xl md:text-3xl font-bold text-gray-900 mb-2"}>
            ATTENDANCE MANAGEMENT
          </h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Manage biometric and manual attendance records
          </p>
        </div>

        {/* Action Buttons */}
        <div className={isDark ? "bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700 shadow-sm" : "bg-white rounded-lg p-4 mb-6 border border-gray-200 shadow-sm"}>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Import Fingerprint Data
            </button>
            
            <button
              onClick={() => setShowProcessModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Process Attendance
            </button>
            
            <button
              onClick={() => setShowManualEntryModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Manual Entry
            </button>
            
            <button
              onClick={() => setShowAuditModal(true)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Audit Log
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className={isDark ? "bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700 shadow-sm" : "bg-white rounded-lg p-4 mb-6 border border-gray-200 shadow-sm"}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Date Range */}
            <div>
              <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({...prev, startDate: e.target.value}))}
                className={isDark ? "w-full px-3 py-2 border border-gray-600 rounded-md text-sm bg-gray-700 text-white" : "w-full px-3 py-2 border border-gray-300 rounded-md text-sm"}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                End Date
              </label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({...prev, endDate: e.target.value}))}
                className={isDark ? "w-full px-3 py-2 border border-gray-600 rounded-md text-sm bg-gray-700 text-white" : "w-full px-3 py-2 border border-gray-300 rounded-md text-sm"}
              />
            </div>

            {/* Employee Filter */}
            <div>
              <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                Employee
              </label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className={isDark ? "w-full px-3 py-2 border border-gray-600 rounded-md text-sm bg-gray-700 text-white" : "w-full px-3 py-2 border border-gray-300 rounded-md text-sm"}
              >
                <option value="">All Employees</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.department})
                  </option>
                ))}
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className={isDark ? "w-full px-3 py-2 border border-gray-600 rounded-md text-sm bg-gray-700 text-white" : "w-full px-3 py-2 border border-gray-300 rounded-md text-sm"}
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Source Filter */}
            <div>
              <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                Data Source
              </label>
              <select
                value={attendanceSource}
                onChange={(e) => setAttendanceSource(e.target.value)}
                className={isDark ? "w-full px-3 py-2 border border-gray-600 rounded-md text-sm bg-gray-700 text-white" : "w-full px-3 py-2 border border-gray-300 rounded-md text-sm"}
              >
                <option value="all">All Sources</option>
                <option value="biometric">Biometric Only</option>
                <option value="manual">Manual Only</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className={isDark ? "bg-blue-900/30 border border-blue-700 rounded-lg p-4" : "bg-blue-50 border border-blue-200 rounded-lg p-4"}>
            <div className={isDark ? "text-xl font-bold text-blue-400" : "text-xl font-bold text-blue-700"}>{summaryStats.totalPresent}</div>
            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Present</div>
          </div>
          <div className={isDark ? "bg-yellow-900/30 border border-yellow-700 rounded-lg p-4" : "bg-yellow-50 border border-yellow-200 rounded-lg p-4"}>
            <div className={isDark ? "text-xl font-bold text-yellow-400" : "text-xl font-bold text-yellow-700"}>{summaryStats.totalLate}</div>
            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Late</div>
          </div>
          <div className={isDark ? "bg-red-900/30 border border-red-700 rounded-lg p-4" : "bg-red-50 border border-red-200 rounded-lg p-4"}>
            <div className={isDark ? "text-xl font-bold text-red-400" : "text-xl font-bold text-red-700"}>{summaryStats.totalAbsent}</div>
            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Absent</div>
          </div>
          <div className={isDark ? "bg-green-900/30 border border-green-700 rounded-lg p-4" : "bg-green-50 border border-green-200 rounded-lg p-4"}>
            <div className={isDark ? "text-xl font-bold text-green-400" : "text-xl font-bold text-green-700"}>
              {summaryStats.totalWorkingHours.toFixed(2)}
            </div>
            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Working Hours</div>
          </div>
        </div>

        {/* Data Source Indicators */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-900"}`}>Biometric ({summaryStats.biometricCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-900"}`}>Manual ({summaryStats.manualCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-900"}`}>Hybrid ({summaryStats.hybridCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-900"}`}>Payroll Locked</span>
          </div>
        </div>

        {/* Attendance Table */}
        <div className={isDark ? "bg-gray-800 rounded-lg border border-gray-700 shadow-sm overflow-hidden" : "bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"}>
          <div className="overflow-x-auto">
            <table className={isDark ? "min-w-full divide-y divide-gray-700" : "min-w-full divide-y divide-gray-200"}>
              <thead className={isDark ? "bg-gray-700" : "bg-gray-50"}>
                <tr>
                  <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>Employee</th>
                  <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>Date</th>
                  <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>Check-In</th>
                  <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>Check-Out</th>
                  <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>Working Hours</th>
                  <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>Overtime</th>
                  <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>Status</th>
                  <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>Source</th>
                  <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>Remarks</th>
                  <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>Actions</th>
                </tr>
              </thead>
              <tbody className={isDark ? "bg-gray-800 divide-y divide-gray-700" : "bg-white divide-y divide-gray-200"}>
                {filteredRecords.map(record => (
                  <tr key={record.id} className={isDark ? `hover:bg-gray-700 ${record.payrollLocked ? 'bg-red-900/30' : ''}` : `hover:bg-gray-50 ${record.payrollLocked ? 'bg-red-50' : ''}`}>
                    <td className="px-4 py-3">
                      <div>
                        <div className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{record.employeeName}</div>
                        <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{record.department}</div>
                      </div>
                    </td>
                    <td className={`px-4 py-3 ${isDark ? "text-gray-300" : "text-gray-900"}`}>{record.date}</td>
                    <td className={`px-4 py-3 ${isDark ? "text-gray-300" : "text-gray-900"}`}>{record.checkIn || '-'}</td>
                    <td className={`px-4 py-3 ${isDark ? "text-gray-300" : "text-gray-900"}`}>{record.checkOut || '-'}</td>
                    <td className={`px-4 py-3 ${isDark ? "text-gray-300" : "text-gray-900"}`}>
                      <span className="font-medium">{record.workingHours}</span> hrs
                    </td>
                    <td className="px-4 py-3">
                      {record.overtime > 0 ? (
                        <span className={isDark ? "text-green-400 font-medium" : "text-green-600 font-medium"}>{record.overtime} hrs</span>
                      ) : <span className={isDark ? "text-gray-400" : "text-gray-600"}>-</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        record.status === 'present' ? (isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') :
                        record.status === 'late' ? (isDark ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800') :
                        record.status === 'half-day' ? (isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800') :
                        (isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          record.source === 'biometric' ? 'bg-green-500' :
                          record.source === 'manual' ? 'bg-blue-500' :
                          'bg-purple-500'
                        }`}></div>
                        <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-900"}`}>{record.source}</span>
                      </div>
                    </td>
                    <td className={`px-4 py-3 max-w-xs truncate ${isDark ? "text-gray-300" : "text-gray-900"}`}>{record.remarks}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {!record.payrollLocked && (
                          <>
                            <button
                              onClick={() => {
                                setManualEntry({
                                  ...record,
                                  employeeId: record.employeeId,
                                  reason: 'Editing existing record'
                                });
                                setShowManualEntryModal(true);
                              }}
                              className={isDark ? "text-blue-400 hover:text-blue-300 hover:bg-gray-700 p-1 rounded" : "text-blue-600 hover:text-blue-800 hover:bg-gray-100 p-1 rounded"}
                              title="Edit"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Delete this attendance record?')) {
                                  setAttendanceRecords(prev => prev.filter(r => r.id !== record.id));
                                  logAudit('DELETE', `Deleted attendance for ${record.employeeName} on ${record.date}`);
                                }
                              }}
                              className={isDark ? "text-red-400 hover:text-red-300 hover:bg-gray-700 p-1 rounded" : "text-red-600 hover:text-red-800 hover:bg-gray-100 p-1 rounded"}
                              title="Delete"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </>
                        )}
                        {record.payrollLocked && (
                          <span className={isDark ? "text-xs text-red-400" : "text-xs text-red-600"}>Locked</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Import Biometric Data</h3>
                  <button onClick={() => setShowImportModal(false)} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select File Format
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="csv">CSV</option>
                      <option value="excel">Excel</option>
                      <option value="dat">DAT (ZKTeco)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload File
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept=".csv,.xlsx,.xls,.dat"
                        onChange={(e) => handleFileImport(e.target.files[0])}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">Click to upload biometric data file</p>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={() => setShowImportModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Import
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manual Entry Modal */}
        {showManualEntryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Manual Attendance Entry</h3>
                  <button onClick={() => setShowManualEntryModal(false)} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </div>
                
                <form onSubmit={(e) => { e.preventDefault(); handleManualEntry(); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee *
                      </label>
                      <select
                        value={manualEntry.employeeId}
                        onChange={(e) => setManualEntry(prev => ({...prev, employeeId: e.target.value}))}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                          <option key={emp.id} value={emp.id}>
                            {emp.name} - {emp.department}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        value={manualEntry.date}
                        onChange={(e) => setManualEntry(prev => ({...prev, date: e.target.value}))}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Check-In Time
                      </label>
                      <input
                        type="time"
                        value={manualEntry.checkIn}
                        onChange={(e) => setManualEntry(prev => ({...prev, checkIn: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Check-Out Time
                      </label>
                      <input
                        type="time"
                        value={manualEntry.checkOut}
                        onChange={(e) => setManualEntry(prev => ({...prev, checkOut: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Working Hours
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        value={manualEntry.workingHours}
                        onChange={(e) => setManualEntry(prev => ({...prev, workingHours: parseFloat(e.target.value)}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Overtime Hours
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        value={manualEntry.overtime}
                        onChange={(e) => setManualEntry(prev => ({...prev, overtime: parseFloat(e.target.value)}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={manualEntry.status}
                        onChange={(e) => setManualEntry(prev => ({...prev, status: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="present">Present</option>
                        <option value="late">Late</option>
                        <option value="half-day">Half Day</option>
                        <option value="absent">Absent</option>
                        <option value="leave">Leave</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Source
                      </label>
                      <select
                        value={manualEntry.source}
                        onChange={(e) => setManualEntry(prev => ({...prev, source: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="manual">Manual Entry</option>
                        <option value="biometric">Biometric Correction</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reason for Manual Entry *
                      </label>
                      <textarea
                        value={manualEntry.reason}
                        onChange={(e) => setManualEntry(prev => ({...prev, reason: e.target.value}))}
                        required
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter reason for manual entry..."
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Approver Name *
                      </label>
                      <input
                        type="text"
                        value={manualEntry.approver}
                        onChange={(e) => setManualEntry(prev => ({...prev, approver: e.target.value}))}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter approver name"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => setShowManualEntryModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save Attendance
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Process Attendance Modal */}
        {showProcessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Process Biometric Data</h3>
                  <button onClick={() => setShowProcessModal(false)} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Process Date
                    </label>
                    <input
                      type="date"
                      value={processForm.date}
                      onChange={(e) => setProcessForm(prev => ({...prev, date: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Process Type
                    </label>
                    <select
                      value={processForm.processType}
                      onChange={(e) => setProcessForm(prev => ({...prev, processType: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="daily">Daily Attendance</option>
                      <option value="range">Date Range</option>
                      <option value="all">Process All Data</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="override"
                      checked={processForm.overrideExisting}
                      onChange={(e) => setProcessForm(prev => ({...prev, overrideExisting: e.target.checked}))}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="override" className="ml-2 text-sm text-gray-700">
                      Override existing attendance records
                    </label>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <p className="text-sm text-yellow-700">
                      This will process biometric logs and generate attendance records for the selected date.
                      {processForm.overrideExisting && ' Existing records will be overwritten.'}
                    </p>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={() => setShowProcessModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={processAttendance}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Process Attendance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audit Log Modal */}
        {showAuditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={isDark ? "bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700" : "bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Attendance Audit Log</h3>
                  <button onClick={() => setShowAuditModal(false)} className={isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}>
                    ✕
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className={isDark ? "min-w-full divide-y divide-gray-700" : "min-w-full divide-y divide-gray-200"}>
                    <thead className={isDark ? "bg-gray-700" : "bg-gray-50"}>
                      <tr>
                        <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>Timestamp</th>
                        <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>Action</th>
                        <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>Description</th>
                        <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>User</th>
                        <th className={isDark ? "px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase" : "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"}>IP Address</th>
                      </tr>
                    </thead>
                    <tbody className={isDark ? "bg-gray-800 divide-y divide-gray-700" : "bg-white divide-y divide-gray-200"}>
                      {auditLogs.map(log => (
                        <tr key={log.id} className={isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}>
                          <td className={`px-4 py-3 text-sm ${isDark ? "text-gray-300" : "text-gray-900"}`}>{new Date(log.timestamp).toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              log.action === 'CREATE' ? (isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') :
                              log.action === 'UPDATE' ? (isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800') :
                              (isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
                            }`}>
                              {log.action}
                            </span>
                          </td>
                          <td className={`px-4 py-3 text-sm ${isDark ? "text-gray-300" : "text-gray-900"}`}>{log.description}</td>
                          <td className={`px-4 py-3 text-sm ${isDark ? "text-gray-300" : "text-gray-900"}`}>{log.userId}</td>
                          <td className={`px-4 py-3 text-sm ${isDark ? "text-gray-300" : "text-gray-900"}`}>{log.ipAddress}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
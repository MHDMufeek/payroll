import React, { useState, useEffect } from 'react';
import TopNav from "../components/TopNav";

const AttendanceReport = () => {
  // State for form controls
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('July');
  const [selectedYear, setSelectedYear] = useState('2021');
  const [sortBy, setSortBy] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  
  // State for manual attendance modal
  const [showManualModal, setShowManualModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  
  // Form state for manual attendance
  const [manualForm, setManualForm] = useState({
    id: '',
    employeeName: '',
    employmentType: 'Full Time',
    workplace: 'Inovace HQ',
    lineManager: '',
    workingDays: 26,
    present: 0,
    absent: 0,
    leave: 0,
    offDay: 0,
    holidays: 0,
    late: 0,
    earlyExit: 0
  });

  // Initial attendance data
  const initialAttendanceData = [
    { id: '00254', employeeName: 'Asif Aminur Rashid', employmentType: 'Full Time', workplace: 'Inovace HQ', lineManager: '', workingDays: 26, present: 26, absent: 0, leave: 4, offDay: 0, holidays: 12, late: 0, earlyExit: 2 },
    { id: '00256', employeeName: 'Khalid Musa Sagar', employmentType: 'Full Time', workplace: 'Inovace R&D', lineManager: '', workingDays: 25, present: 25, absent: 0, leave: 1, offDay: 4, holidays: 10, late: 0, earlyExit: 3 },
    { id: '00257', employeeName: 'Mainul Islam Mahi', employmentType: 'Full Time', workplace: 'Inovace HQ', lineManager: '', workingDays: 24, present: 24, absent: 0, leave: 2, offDay: 4, holidays: 0, late: 0, earlyExit: 1 },
    { id: '00258', employeeName: 'Risalat Zaman', employmentType: 'Full Time', workplace: 'Inovace HQ', lineManager: '', workingDays: 26, present: 26, absent: 0, leave: 4, offDay: 0, holidays: 2, late: 0, earlyExit: 0 },
    { id: '00259', employeeName: 'Minhaz Khan', employmentType: 'Part Time', workplace: 'Inovace R&D', lineManager: '', workingDays: 23, present: 23, absent: 0, leave: 1, offDay: 4, holidays: 0, late: 0, earlyExit: 1 },
    { id: '00260', employeeName: 'Risalat Zaman', employmentType: 'Full Time', workplace: 'Inovace R&D', lineManager: '', workingDays: 26, present: 26, absent: 0, leave: 4, offDay: 0, holidays: 2, late: 0, earlyExit: 0 },
    { id: '00261', employeeName: 'Mainul Islam Mahi', employmentType: 'Part Time', workplace: 'Inovace HQ', lineManager: '', workingDays: 26, present: 26, absent: 0, leave: 4, offDay: 0, holidays: 3, late: 0, earlyExit: 0 },
    { id: '00262', employeeName: 'Nurjhan Reya', employmentType: 'Part Time', workplace: 'Inovace R&D', lineManager: '', workingDays: 26, present: 26, absent: 0, leave: 4, offDay: 0, holidays: 2, late: 0, earlyExit: 0 },
    { id: '00263', employeeName: 'Rafail Azam', employmentType: 'Full Time', workplace: 'Inovace R&D', lineManager: '', workingDays: 25, present: 25, absent: 0, leave: 4, offDay: 0, holidays: 1, late: 0, earlyExit: 0 },
    { id: '00264', employeeName: 'Naimul Rifat', employmentType: 'Full Time', workplace: 'Inovace R&D', lineManager: '', workingDays: 20, present: 20, absent: 0, leave: 4, offDay: 0, holidays: 3, late: 0, earlyExit: 1 },
  ];

  // State for attendance data
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);

  // Summary statistics (recalculated when data changes)
  const summaryStats = {
    absentManDays: attendanceData.reduce((sum, record) => sum + record.absent, 0),
    leaveManDays: attendanceData.reduce((sum, record) => sum + record.leave, 0),
    lateManHours: attendanceData.reduce((sum, record) => sum + record.late, 0) * 8, // Assuming 8 hours per day
    overtimeManHours: 60000 // Keeping this static as in original
  };

  // Month and year options
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = ['2021', '2022', '2023', '2024', '2025'];

  // Sort options
  const sortOptions = [
    { value: 'id', label: 'ID' },
    { value: 'name', label: 'Employee Name' },
    { value: 'present', label: 'Present Days' },
    { value: 'absent', label: 'Absent Days' },
    { value: 'late', label: 'Late Count' }
  ];

  // Rows per page options
  const rowsOptions = [10, 25, 50, 100];

  // Employment types and workplaces
  const employmentTypes = ['Full Time', 'Part Time'];
  const workplaces = ['Inovace HQ', 'Inovace R&D'];

  // Filter and sort data based on search and sort criteria
  const filteredData = attendanceData
    .filter(record => {
      const searchLower = searchTerm.toLowerCase();
      return (
        record.id.toLowerCase().includes(searchLower) ||
        record.employeeName.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'id':
          return a.id.localeCompare(b.id);
        case 'name':
          return a.employeeName.localeCompare(b.employeeName);
        case 'present':
          return b.present - a.present;
        case 'absent':
          return b.absent - a.absent;
        case 'late':
          return b.late - a.late;
        default:
          return 0;
      }
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handle page changes
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle manual form input changes
  const handleManualFormChange = (e) => {
    const { name, value } = e.target;
    setManualForm(prev => ({
      ...prev,
      [name]: name === 'employeeName' || name === 'lineManager' || name === 'id' ? value : Number(value)
    }));
  };

  // Open modal for adding new record
  const handleAddManualAttendance = () => {
    setEditingRecord(null);
    setManualForm({
      id: '',
      employeeName: '',
      employmentType: 'Full Time',
      workplace: 'Inovace HQ',
      lineManager: '',
      workingDays: 26,
      present: 0,
      absent: 0,
      leave: 0,
      offDay: 0,
      holidays: 0,
      late: 0,
      earlyExit: 0
    });
    setShowManualModal(true);
  };

  // Open modal for editing existing record
  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setManualForm(record);
    setShowManualModal(true);
  };

  // Delete record
  const handleDeleteRecord = (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      setAttendanceData(prev => prev.filter(record => record.id !== id));
    }
  };

  // Submit manual attendance form
  const handleSubmitManualAttendance = (e) => {
    e.preventDefault();
    
    // Validate total days
    const totalDays = manualForm.present + manualForm.absent + manualForm.leave + manualForm.offDay + manualForm.holidays;
    if (totalDays > manualForm.workingDays) {
      alert(`Total days (${totalDays}) cannot exceed working days (${manualForm.workingDays})`);
      return;
    }

    if (editingRecord) {
      // Update existing record
      setAttendanceData(prev => prev.map(record => 
        record.id === editingRecord.id ? manualForm : record
      ));
    } else {
      // Add new record
      // Check if ID already exists
      if (attendanceData.some(record => record.id === manualForm.id)) {
        alert('Employee ID already exists!');
        return;
      }
      
      setAttendanceData(prev => [...prev, manualForm]);
    }
    
    setShowManualModal(false);
  };

  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, rowsPerPage, selectedMonth, selectedYear]);

  // Reset manual form when modal closes
  useEffect(() => {
    if (!showManualModal) {
      setEditingRecord(null);
    }
  }, [showManualModal]);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">ATTENDANCE REPORT</h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-gray-700 font-medium">
                Monthly Attendance Report of {selectedMonth} {selectedYear}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Month:</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Year:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-b border-gray-300 my-3"></div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-lg p-4 md:p-6 mb-6 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Employee by Name/ID
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter name or ID..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Month Display */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selected Period
              </label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm">
                <span className="font-medium">{selectedMonth} {selectedYear}</span>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Rows Per Page */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rows Per Page
              </label>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {rowsOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-xl md:text-2xl font-bold text-red-700">{formatNumber(summaryStats.absentManDays)}</div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">Absent Man Days</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-xl md:text-2xl font-bold text-yellow-700">{formatNumber(summaryStats.leaveManDays)}</div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">Leave Man Days</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-xl md:text-2xl font-bold text-orange-700">{formatNumber(summaryStats.lateManHours)}</div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">Late Man Hours</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-xl md:text-2xl font-bold text-green-700">{formatNumber(summaryStats.overtimeManHours)}</div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">Overtime Man Hours</div>
            </div>
          </div>
        </div>

        {/* Add Manual Attendance Button */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Attendance Records</h2>
            <p className="text-sm text-gray-600">Total {attendanceData.length} records</p>
          </div>
          <button
            onClick={handleAddManualAttendance}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Manual Attendance
          </button>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    SI
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Employee Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Employment Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Workplace
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Line Manager
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Working Days
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Present
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Absent
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Leave
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Off Day
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Holidays
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Late
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Early Exit
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((record, index) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                      {(startIndex + index + 1).toString().padStart(2, '0')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                      {record.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                      {record.employeeName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        record.employmentType === 'Full Time' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {record.employmentType}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                      {record.workplace}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                      {record.lineManager || '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 text-center">
                      {record.workingDays}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 text-center">
                      <span className="font-medium text-green-600">{record.present}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 text-center">
                      {record.absent === 0 ? (
                        <span className="text-gray-500">0</span>
                      ) : (
                        <span className="font-medium text-red-600">{record.absent}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 text-center">
                      {record.leave === 0 ? (
                        <span className="text-gray-500">0</span>
                      ) : (
                        <span className="font-medium text-yellow-600">{record.leave}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 text-center">
                      {record.offDay === 0 ? (
                        <span className="text-gray-500">0</span>
                      ) : (
                        <span className="font-medium text-blue-600">{record.offDay}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 text-center">
                      {record.holidays === 0 ? (
                        <span className="text-gray-500">0</span>
                      ) : (
                        <span className="font-medium text-purple-600">{record.holidays}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 text-center">
                      {record.late === 0 ? (
                        <span className="text-gray-500">0</span>
                      ) : (
                        <span className="font-medium text-orange-600">{record.late}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 text-center">
                      {record.earlyExit === 0 ? (
                        <span className="text-gray-500">0</span>
                      ) : (
                        <span className="font-medium text-red-600">{record.earlyExit}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditRecord(record)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteRecord(record.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
              </div>
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  First
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  &lt;
                </button>
                <span className="px-3 py-1 text-sm font-medium text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    currentPage === totalPages || totalPages === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  &gt;
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    currentPage === totalPages || totalPages === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Last
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Manual Attendance Modal */}
        {showManualModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingRecord ? 'Edit Attendance Record' : 'Add Manual Attendance'}
                  </h3>
                  <button
                    onClick={() => setShowManualModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmitManualAttendance}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700">Basic Information</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Employee ID *
                        </label>
                        <input
                          type="text"
                          name="id"
                          value={manualForm.id}
                          onChange={handleManualFormChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Employee Name *
                        </label>
                        <input
                          type="text"
                          name="employeeName"
                          value={manualForm.employeeName}
                          onChange={handleManualFormChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Employment Type
                        </label>
                        <select
                          name="employmentType"
                          value={manualForm.employmentType}
                          onChange={handleManualFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {employmentTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Workplace
                        </label>
                        <select
                          name="workplace"
                          value={manualForm.workplace}
                          onChange={handleManualFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {workplaces.map(place => (
                            <option key={place} value={place}>{place}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Line Manager
                        </label>
                        <input
                          type="text"
                          name="lineManager"
                          value={manualForm.lineManager}
                          onChange={handleManualFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Attendance Days */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700">Attendance Days</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Working Days *
                        </label>
                        <input
                          type="number"
                          name="workingDays"
                          value={manualForm.workingDays}
                          onChange={handleManualFormChange}
                          min="0"
                          max="31"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Present Days
                        </label>
                        <input
                          type="number"
                          name="present"
                          value={manualForm.present}
                          onChange={handleManualFormChange}
                          min="0"
                          max={manualForm.workingDays}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Absent Days
                        </label>
                        <input
                          type="number"
                          name="absent"
                          value={manualForm.absent}
                          onChange={handleManualFormChange}
                          min="0"
                          max={manualForm.workingDays}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Leave Days
                        </label>
                        <input
                          type="number"
                          name="leave"
                          value={manualForm.leave}
                          onChange={handleManualFormChange}
                          min="0"
                          max={manualForm.workingDays}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Other Information */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700">Other Information</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Off Days
                        </label>
                        <input
                          type="number"
                          name="offDay"
                          value={manualForm.offDay}
                          onChange={handleManualFormChange}
                          min="0"
                          max={manualForm.workingDays}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Holidays
                        </label>
                        <input
                          type="number"
                          name="holidays"
                          value={manualForm.holidays}
                          onChange={handleManualFormChange}
                          min="0"
                          max={manualForm.workingDays}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Late Count
                        </label>
                        <input
                          type="number"
                          name="late"
                          value={manualForm.late}
                          onChange={handleManualFormChange}
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Early Exit Count
                        </label>
                        <input
                          type="number"
                          name="earlyExit"
                          value={manualForm.earlyExit}
                          onChange={handleManualFormChange}
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Days Summary */}
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Days Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{manualForm.present}</div>
                        <div className="text-sm text-gray-600">Present</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{manualForm.absent}</div>
                        <div className="text-sm text-gray-600">Absent</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{manualForm.leave}</div>
                        <div className="text-sm text-gray-600">Leave</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{manualForm.workingDays}</div>
                        <div className="text-sm text-gray-600">Working Days</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      Total Days: <span className="font-medium">{manualForm.present + manualForm.absent + manualForm.leave + manualForm.offDay + manualForm.holidays}</span> / {manualForm.workingDays}
                      {manualForm.present + manualForm.absent + manualForm.leave + manualForm.offDay + manualForm.holidays > manualForm.workingDays && (
                        <span className="text-red-600 ml-2">(Exceeds working days!)</span>
                      )}
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => setShowManualModal(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {editingRecord ? 'Update Record' : 'Add Record'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Additional Info and Actions */}
        <div className="mt-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
                <span className="text-sm text-gray-600">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-sm"></div>
                <span className="text-sm text-gray-600">Absent/Early Exit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-600 rounded-sm"></div>
                <span className="text-sm text-gray-600">Leave</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-600 rounded-sm"></div>
                <span className="text-sm text-gray-600">Late</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Print Report
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Export as PDF
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                Export as Excel
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>Report generated on: {new Date().toLocaleDateString()}</p>
            <p className="mt-1">Data reflects attendance records for {selectedMonth} {selectedYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
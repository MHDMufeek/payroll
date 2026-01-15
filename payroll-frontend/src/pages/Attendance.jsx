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

  // Static attendance data (unchanged from your screenshot)
  const attendanceData = [
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

  // Summary statistics
  const summaryStats = {
    absentManDays: 500,
    leaveManDays: 1000,
    lateManHours: 1500,
    overtimeManHours: 60000
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

  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, rowsPerPage, selectedMonth, selectedYear]);

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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Early Exit
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
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                      {record.earlyExit === 0 ? (
                        <span className="text-gray-500">0</span>
                      ) : (
                        <span className="font-medium text-red-600">{record.earlyExit}</span>
                      )}
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
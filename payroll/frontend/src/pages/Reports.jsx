import React, { useState, useEffect } from 'react';
import TopNav from "../components/TopNav";
import { useTheme } from "../context/ThemeContext";
import { 
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const Reports = () => {
  const { isDark } = useTheme();
  const [selectedReportType, setSelectedReportType] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  // Report types
  const reportTypes = [
    { id: 'overview', name: 'Overview Dashboard', icon: '📊' },
    { id: 'attendance', name: 'Attendance Reports', icon: '📅' },
    { id: 'payroll', name: 'Payroll Reports', icon: '💰' },
    { id: 'employee', name: 'Employee Analytics', icon: '👥' },
    { id: 'department', name: 'Department Reports', icon: '🏢' },
    { id: 'performance', name: 'Performance Metrics', icon: '📈' },
  ];

  // Time ranges
  const timeRanges = [
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'quarterly', name: 'Quarterly' },
    { id: 'yearly', name: 'Yearly' },
    { id: 'custom', name: 'Custom Range' },
  ];

  // Departments for filtering
  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'sales', name: 'Sales' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'hr', name: 'Human Resources' },
    { id: 'finance', name: 'Finance' },
    { id: 'operations', name: 'Operations' },
  ];

  // Mock data - Overview Statistics
  const overviewStats = [
    { label: 'Total Employees', value: 156, change: '+12%', color: 'bg-blue-500' },
    { label: 'Active Employees', value: 142, change: '+8%', color: 'bg-green-500' },
    { label: 'Monthly Payroll', value: '$425,850', change: '+5%', color: 'bg-purple-500' },
    { label: 'Avg Attendance', value: '94.2%', change: '+2.3%', color: 'bg-orange-500' },
    { label: 'Departments', value: '8', change: '0%', color: 'bg-pink-500' },
    { label: 'Open Positions', value: '12', change: '-3', color: 'bg-indigo-500' },
  ];

  // Attendance data for charts
  const attendanceData = [
    { month: 'Jan', present: 92, absent: 5, late: 3, leave: 8 },
    { month: 'Feb', present: 94, absent: 3, late: 2, leave: 7 },
    { month: 'Mar', present: 91, absent: 6, late: 4, leave: 9 },
    { month: 'Apr', present: 95, absent: 2, late: 1, leave: 6 },
    { month: 'May', present: 93, absent: 4, late: 3, leave: 8 },
    { month: 'Jun', present: 96, absent: 1, late: 2, leave: 5 },
  ];

  // Department performance data
  const departmentPerformance = [
    { name: 'Engineering', attendance: 96, productivity: 92, budget: 120000, employees: 45 },
    { name: 'Sales', attendance: 89, productivity: 98, budget: 85000, employees: 28 },
    { name: 'Marketing', attendance: 92, productivity: 85, budget: 65000, employees: 22 },
    { name: 'HR', attendance: 95, productivity: 88, budget: 45000, employees: 18 },
    { name: 'Finance', attendance: 97, productivity: 94, budget: 55000, employees: 20 },
    { name: 'Operations', attendance: 93, productivity: 91, budget: 75000, employees: 25 },
  ];

  // Employee distribution by department
  const employeeDistribution = [
    { name: 'Engineering', value: 45, color: '#3b82f6' },
    { name: 'Sales', value: 28, color: '#10b981' },
    { name: 'Marketing', value: 22, color: '#8b5cf6' },
    { name: 'HR', value: 18, color: '#f59e0b' },
    { name: 'Finance', value: 20, color: '#ef4444' },
    { name: 'Operations', value: 25, color: '#ec4899' },
  ];

  // Monthly payroll data
  const payrollData = [
    { month: 'Jan', salary: 385000, bonus: 25000, deductions: 18500 },
    { month: 'Feb', salary: 390000, bonus: 28000, deductions: 19200 },
    { month: 'Mar', salary: 395000, bonus: 30000, deductions: 19800 },
    { month: 'Apr', salary: 400000, bonus: 32000, deductions: 20500 },
    { month: 'May', salary: 405000, bonus: 35000, deductions: 21000 },
    { month: 'Jun', salary: 425850, bonus: 38000, deductions: 22500 },
  ];

  // Top performing employees
  const topPerformers = [
    { name: 'John Smith', department: 'Engineering', performance: 4.9, projects: 15 },
    { name: 'Sarah Johnson', department: 'Sales', performance: 4.8, deals: '1.2M' },
    { name: 'Mike Chen', department: 'Engineering', performance: 4.7, projects: 12 },
    { name: 'Emma Wilson', department: 'Marketing', performance: 4.6, campaigns: 8 },
    { name: 'David Brown', department: 'Operations', performance: 4.8, efficiency: '98%' },
  ];

  // Attendance trends
  const attendanceTrends = [
    { day: 'Mon', attendance: 94, late: 5 },
    { day: 'Tue', attendance: 96, late: 3 },
    { day: 'Wed', attendance: 95, late: 4 },
    { day: 'Thu', attendance: 93, late: 6 },
    { day: 'Fri', attendance: 92, late: 7 },
    { day: 'Sat', attendance: 45, late: 2 },
    { day: 'Sun', attendance: 12, late: 1 },
  ];

  // Handle report generation
  const handleGenerateReport = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(`Report generated for ${selectedReportType} (${selectedTimeRange})`);
    }, 1500);
  };

  // Handle export
  const handleExport = (format) => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  // Set default dates
  useEffect(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    setFilterStartDate(firstDay.toISOString().split('T')[0]);
    setFilterEndDate(lastDay.toISOString().split('T')[0]);
  }, []);

  // Render report based on selected type
  const renderReportContent = () => {
    switch(selectedReportType) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {overviewStats.map((stat, index) => (
                <div key={index} className={isDark ? "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4" : "bg-white rounded-lg shadow-sm border border-gray-200 p-4"}>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  </div>
                  <div className={`text-2xl font-bold ${isDark ? "text-gray-300" : "text-gray-900"}`}>{stat.value}</div>
                  <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attendance Trend */}
              <div className={isDark ? "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6" : "bg-white rounded-lg shadow-sm border border-gray-200 p-6"}>
                <h3 className={`text-lg font-semibold ${isDark ? "text-gray-300" : "text-gray-900"} mb-4`}>Attendance Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#f0f0f0"} />
                    <XAxis dataKey="month" stroke={isDark ? "#9ca3af" : "#666"} />
                    <YAxis stroke={isDark ? "#9ca3af" : "#666"} />
                    <Tooltip contentStyle={isDark ? {backgroundColor: '#1f2937', border: '1px solid #374151'} : {}} />
                    <Legend />
                    <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Department Distribution */}
              <div className={isDark ? "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6" : "bg-white rounded-lg shadow-sm border border-gray-200 p-6"}>
                <h3 className={`text-lg font-semibold ${isDark ? "text-gray-300" : "text-gray-900"} mb-4`}>Employee Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={employeeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {employeeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={isDark ? {backgroundColor: '#1f2937', border: '1px solid #374151'} : {}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Department Performance */}
              <div className={isDark ? "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6" : "bg-white rounded-lg shadow-sm border border-gray-200 p-6"}>
                <h3 className={`text-lg font-semibold ${isDark ? "text-gray-300" : "text-gray-900"} mb-4`}>Department Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#f0f0f0"} />
                    <XAxis dataKey="name" stroke={isDark ? "#9ca3af" : "#666"} />
                    <YAxis stroke={isDark ? "#9ca3af" : "#666"} />
                    <Tooltip contentStyle={isDark ? {backgroundColor: '#1f2937', border: '1px solid #374151'} : {}} />
                    <Legend />
                    <Bar dataKey="attendance" fill="#3b82f6" name="Attendance %" />
                    <Bar dataKey="productivity" fill="#10b981" name="Productivity %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Payroll Trend */}
              <div className={isDark ? "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6" : "bg-white rounded-lg shadow-sm border border-gray-200 p-6"}>
                <h3 className={`text-lg font-semibold ${isDark ? "text-gray-300" : "text-gray-900"} mb-4`}>Payroll Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={payrollData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#f0f0f0"} />
                    <XAxis dataKey="month" stroke={isDark ? "#9ca3af" : "#666"} />
                    <YAxis stroke={isDark ? "#9ca3af" : "#666"} />
                    <Tooltip contentStyle={isDark ? {backgroundColor: '#1f2937', border: '1px solid #374151'} : {}} />
                    <Area type="monotone" dataKey="salary" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Salary" />
                    <Area type="monotone" dataKey="bonus" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} name="Bonus" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Performers Table */}
            <div className={isDark ? "bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden" : "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"}>
              <div className={`px-6 py-4 ${isDark ? "border-b border-gray-700" : "border-b border-gray-200"}`}>
                <h3 className={`text-lg font-semibold ${isDark ? "text-gray-300" : "text-gray-900"}`}>Top Performers</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={isDark ? "bg-gray-700" : "bg-gray-50"}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}>Employee</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}>Department</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}>Performance</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}>Metrics</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}>Status</th>
                    </tr>
                  </thead>
                  <tbody className={isDark ? "divide-y divide-gray-700 bg-gray-800" : "divide-y divide-gray-200"}>
                    {topPerformers.map((emp, index) => (
                      <tr key={index} className={isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={isDark ? "w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center mr-3" : "w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3"}>
                              <span className={isDark ? "text-blue-300 font-bold" : "text-blue-600 font-bold"}>{emp.name.charAt(0)}</span>
                            </div>
                            <div>
                              <div className={`font-medium ${isDark ? "text-gray-300" : "text-gray-900"}`}>{emp.name}</div>
                              <div className={`text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>Employee ID: {1000 + index}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={isDark ? "px-3 py-1 text-xs font-medium bg-blue-900 text-blue-200 rounded-full" : "px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"}>
                            {emp.department}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={isDark ? "w-24 bg-gray-700 rounded-full h-2 mr-2" : "w-24 bg-gray-200 rounded-full h-2 mr-2"}>
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${(emp.performance / 5) * 100}%` }}
                              ></div>
                            </div>
                            <span className={`font-medium ${isDark ? "text-gray-300" : "text-gray-900"}`}>{emp.performance}/5.0</span>
                          </div>
                        </td>
                        <td className={`px-6 py-4 ${isDark ? "text-gray-300" : "text-gray-900"}`}>
                          {emp.projects ? `${emp.projects} projects` : `${emp.deals} deals`}
                        </td>
                        <td className="px-6 py-4">
                          <span className={isDark ? "px-3 py-1 text-xs font-medium bg-green-900 text-green-200 rounded-full" : "px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"}>
                            Excellent
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Attendance Summary */}
              <div className={isDark ? "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6" : "bg-white rounded-lg shadow-sm border border-gray-200 p-6"}>
                <h3 className={`text-lg font-semibold ${isDark ? "text-gray-300" : "text-gray-900"} mb-4`}>Attendance Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Working Days</span>
                    <span className="font-semibold">26</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Attendance</span>
                    <span className="font-semibold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Absent Days</span>
                    <span className="font-semibold text-red-600">42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Late Arrivals</span>
                    <span className="font-semibold text-yellow-600">18</span>
                  </div>
                </div>
              </div>

              {/* Daily Attendance Trend */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance Pattern</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={attendanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#3b82f6" name="Attendance %" />
                    <Bar dataKey="late" fill="#f59e0b" name="Late Arrivals" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Department-wise Attendance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Attendance</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Attendance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late Arrivals</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent Days</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {departmentPerformance.map((dept, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{dept.name}</td>
                        <td className="px-6 py-4">{dept.employees}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${dept.attendance}%` }}
                              ></div>
                            </div>
                            <span>{dept.attendance}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-yellow-600 font-medium">{Math.floor(dept.employees * 0.15)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-red-600 font-medium">{Math.floor(dept.employees * 0.08)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            dept.attendance >= 95 ? 'bg-green-100 text-green-800' :
                            dept.attendance >= 90 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {dept.attendance >= 95 ? 'Excellent' : dept.attendance >= 90 ? 'Good' : 'Needs Attention'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'payroll':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payroll Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll Overview</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-700">$425,850</div>
                      <div className="text-sm text-gray-600">Monthly Payroll</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">$38,000</div>
                      <div className="text-sm text-gray-600">Total Bonus</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Expense Distribution</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Base Salary</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Bonuses</span>
                          <span className="font-medium">9%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '9%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Benefits</span>
                          <span className="font-medium">8%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '8%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Taxes & Deductions</span>
                          <span className="font-medium">5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department-wise Payroll */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Payroll</h3>
                <div className="space-y-4">
                  {departmentPerformance.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          dept.name === 'Engineering' ? 'bg-blue-500' :
                          dept.name === 'Sales' ? 'bg-green-500' :
                          dept.name === 'Marketing' ? 'bg-purple-500' :
                          dept.name === 'HR' ? 'bg-yellow-500' :
                          dept.name === 'Finance' ? 'bg-red-500' : 'bg-pink-500'
                        }`}></div>
                        <span className="font-medium text-gray-900">{dept.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">${dept.budget.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">
                          ${(dept.budget / dept.employees).toLocaleString()} per employee
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payroll History Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Payroll History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonuses</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payrollData.map((payroll, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{payroll.month}</td>
                        <td className="px-6 py-4">${payroll.salary.toLocaleString()}</td>
                        <td className="px-6 py-4 text-green-600">${payroll.bonus.toLocaleString()}</td>
                        <td className="px-6 py-4 text-red-600">${payroll.deductions.toLocaleString()}</td>
                        <td className="px-6 py-4 font-bold text-gray-900">
                          ${(payroll.salary + payroll.bonus - payroll.deductions).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            Processed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Report Type</h3>
            <p className="text-gray-600 mb-6">Choose a report type from the sidebar to view detailed analytics</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {reportTypes.slice(1).map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedReportType(type.id)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{type.name}</div>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={isDark ? "min-h-screen bg-gray-900" : "min-h-screen bg-gray-50"}>
      <TopNav />
      
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className={isDark ? "text-2xl md:text-3xl font-bold text-white" : "text-2xl md:text-3xl font-bold text-gray-900"}>Analytics & Reports</h1>
              <p className={isDark ? "text-gray-400 mt-2" : "text-gray-600 mt-2"}>Comprehensive analytics and reporting dashboard</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleGenerateReport}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Generate Report
                  </>
                )}
              </button>
              
              <div className="relative">
                <button className={isDark ? "px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2" : "px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export
                </button>
                <div className={isDark ? "absolute right-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 hidden group-hover:block z-10" : "absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 hidden group-hover:block z-10"}>
                  <button onClick={() => handleExport('pdf')} className={isDark ? "block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" : "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"}>
                    Export as PDF
                  </button>
                  <button onClick={() => handleExport('excel')} className={isDark ? "block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" : "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"}>
                    Export as Excel
                  </button>
                  <button onClick={() => handleExport('csv')} className={isDark ? "block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" : "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"}>
                    Export as CSV
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className={isDark ? "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4 mb-6" : "bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6"}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Report Type */}
              <div>
                <label className={isDark ? "block text-sm font-medium text-gray-300 mb-1" : "block text-sm font-medium text-gray-700 mb-1"}>Report Type</label>
                <select
                  value={selectedReportType}
                  onChange={(e) => setSelectedReportType(e.target.value)}
                  className={isDark ? "w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" : "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"}
                >
                  {reportTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              {/* Department Filter */}
              <div>
                <label className={isDark ? "block text-sm font-medium text-gray-300 mb-1" : "block text-sm font-medium text-gray-700 mb-1"}>Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className={isDark ? "w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" : "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"}
                >
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>

              {/* Time Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {timeRanges.map(range => (
                    <option key={range.id} value={range.id}>{range.name}</option>
                  ))}
                </select>
              </div>

              {/* Date Range (visible when custom is selected) */}
              {selectedTimeRange === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={filterStartDate}
                      onChange={(e) => setFilterStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                    <input
                      type="date"
                      value={filterEndDate}
                      onChange={(e) => setFilterEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Selected Filters Display */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600">Active filters:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {reportTypes.find(r => r.id === selectedReportType)?.name}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {departments.find(d => d.id === selectedDepartment)?.name}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  {timeRanges.find(t => t.id === selectedTimeRange)?.name}
                </span>
                {filterStartDate && filterEndDate && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    {formatDate(filterStartDate)} - {formatDate(filterEndDate)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className={isDark ? "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4 md:p-6" : "bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6"}>
          {renderReportContent()}
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={isDark ? "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4" : "bg-white rounded-lg shadow-sm border border-gray-200 p-4"}>
            <div className={isDark ? "text-sm text-gray-400" : "text-sm text-gray-600"}>Report Generated</div>
            <div className={isDark ? "font-semibold text-white" : "font-semibold text-gray-900"}>{new Date().toLocaleDateString()}</div>
          </div>
          <div className={isDark ? "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4" : "bg-white rounded-lg shadow-sm border border-gray-200 p-4"}>
            <div className={isDark ? "text-sm text-gray-400" : "text-sm text-gray-600"}>Data Points</div>
            <div className={isDark ? "font-semibold text-white" : "font-semibold text-gray-900"}>1,248 records</div>
          </div>
          <div className={isDark ? "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4" : "bg-white rounded-lg shadow-sm border border-gray-200 p-4"}>
            <div className={isDark ? "text-sm text-gray-400" : "text-sm text-gray-600"}>Last Updated</div>
            <div className={isDark ? "font-semibold text-white" : "font-semibold text-gray-900"}>Today, 10:30 AM</div>
          </div>
          <div className={isDark ? "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4" : "bg-white rounded-lg shadow-sm border border-gray-200 p-4"}>
            <div className={isDark ? "text-sm text-gray-400" : "text-sm text-gray-600"}>Report Accuracy</div>
            <div className={isDark ? "font-semibold text-green-400" : "font-semibold text-green-600"}>99.8%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
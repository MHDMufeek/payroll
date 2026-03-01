import TopNav from "../components/TopNav";
import StatCard from "../components/StatCard";
import { useTheme } from "../context/ThemeContext";
import axios from 'axios';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const { isDark } = useTheme();

  // State for dynamic data
  const [employees, setEmployees] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [attendancePercent, setAttendancePercent] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [leaveToday, setLeaveToday] = useState([]);
  const [scheduleToday, setScheduleToday] = useState([]);
  const [quickStats, setQuickStats] = useState({ projects: 0, meetings: 0, retirement: 0 });
  const [payrollThisMonth, setPayrollThisMonth] = useState(0);
  const [pendingPayroll, setPendingPayroll] = useState(0);
  const [loading, setLoading] = useState(true);

  // Derived values
  const activeEmployees = employees.length;
  const presentToday = todayAttendance.filter(r => r.status === 'present').length;

  // API fetch on mount
  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toISOString().split('T')[0];
      try {
        const [
          empRes,
          attRes,
          deptRes,
          leaveRes,
          scheduleRes,
          quickStatsRes,
          payrollRes
        ] = await Promise.allSettled([
          axios.get('http://localhost:5000/employees'),
          axios.get('http://localhost:5000/attendance', { params: { startDate: today, endDate: today } }),
          axios.get('http://localhost:5000/departments?stats=true'),
          axios.get('http://localhost:5000/leaves/today'),
          axios.get('http://localhost:5000/schedule/today'),
          axios.get('http://localhost:5000/quick-stats'),
          axios.get('http://localhost:5000/payroll/stats')
        ]);

        // Employees
        if (empRes.status === 'fulfilled') setEmployees(empRes.value.data || []);
        else console.warn('Failed to fetch employees', empRes.reason);

        // Attendance
        if (attRes.status === 'fulfilled') {
          const atts = attRes.value.data || [];
          setTodayAttendance(atts);
        } else console.warn('Failed to fetch attendance', attRes.reason);

        // Departments
        if (deptRes.status === 'fulfilled') setDepartments(deptRes.value.data || []);
        else console.warn('Failed to fetch departments', deptRes.reason);

        // Leaves today
        if (leaveRes.status === 'fulfilled') setLeaveToday(leaveRes.value.data || []);
        else console.warn('Failed to fetch leaves', leaveRes.reason);

        // Schedule today
        if (scheduleRes.status === 'fulfilled') setScheduleToday(scheduleRes.value.data || []);
        else console.warn('Failed to fetch schedule', scheduleRes.reason);

        // Quick stats
        if (quickStatsRes.status === 'fulfilled') setQuickStats(quickStatsRes.value.data || {});
        else console.warn('Failed to fetch quick stats', quickStatsRes.reason);

        // Payroll stats
        if (payrollRes.status === 'fulfilled') {
          const { totalPayroll, pendingPayroll } = payrollRes.value.data || {};
          setPayrollThisMonth(totalPayroll || 0);
          setPendingPayroll(pendingPayroll || 0);
        } else console.warn('Failed to fetch payroll stats', payrollRes.reason);

      } catch (err) {
        console.warn('Dashboard: backend not available', err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Recalculate attendance percent whenever employees or todayAttendance change
  useEffect(() => {
    const presentCount = todayAttendance.filter(a => a.status === 'present').length;
    const total = employees.length || 1;
    setAttendancePercent(Math.round((presentCount / total) * 100));
  }, [employees, todayAttendance]);

  // Circle progress variables
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const dash = `${(attendancePercent / 100) * circumference} ${circumference}`;

  // Format currency
  const formatCurrency = (amount) => `₹${(amount / 1000).toFixed(1)}K`; // assuming amount in rupees

  return (
    <div className={isDark ? "min-h-screen bg-gray-900 text-white" : "min-h-screen bg-white"}>
      <TopNav />

      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-blue-900"}>
            Welcome back, John!
          </h1>
          <p className={isDark ? "text-gray-300" : "text-blue-700"}>
            Here's what's happening with your team today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Today Attendance Card with dynamic percentage */}
          <div className={isDark ? "bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700" : "bg-white p-6 rounded-xl shadow-sm border border-blue-100"}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={isDark ? "text-gray-400 font-medium" : "text-blue-700 font-medium"}>
                Today Attendance
              </h3>
              <span className={isDark ? "text-blue-300 font-bold" : "text-blue-600 font-bold"}>
                {attendancePercent}%
              </span>
            </div>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke={isDark ? "#374151" : "#dbeafe"}
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="#1d4ed8"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={dash}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-blue-900"}>
                  {attendancePercent}%
                </span>
              </div>
            </div>
          </div>

          {/* Stat Cards with dynamic values */}
          <StatCard title="Active Employees" value={activeEmployees} color="blue" />
          <StatCard title="Payroll This Month" value={formatCurrency(payrollThisMonth)} color="blue" />
          <StatCard title="Present Today" value={presentToday} color="blue" />
          <StatCard title="Pending Payroll" value={pendingPayroll} color="blue" />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department Section */}
          <div className={isDark ? "bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6" : "bg-white rounded-xl shadow-sm border border-blue-100 p-6"}>
            <h2 className={isDark ? "text-lg font-semibold text-white mb-4" : "text-lg font-semibold text-blue-900 mb-4"}>
              Department
            </h2>
            <div className="space-y-3">
              {departments.length > 0 ? (
                departments.map((dept, index) => (
                  <div key={dept.name} className={isDark ? "flex items-center justify-between p-3 hover:bg-gray-700 rounded-lg transition-colors" : "flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition-colors"}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        index % 5 === 0 ? (isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700") :
                        index % 5 === 1 ? (isDark ? "bg-blue-800 text-blue-200" : "bg-blue-200 text-blue-800") :
                        index % 5 === 2 ? (isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700") :
                        index % 5 === 3 ? (isDark ? "bg-blue-800 text-blue-200" : "bg-blue-200 text-blue-800") :
                        (isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700")
                      }`}>
                        <span className="font-bold">{dept.name.charAt(0)}</span>
                      </div>
                      <span className={isDark ? "font-medium text-gray-200" : "font-medium text-blue-800"}>{dept.name}</span>
                    </div>
                    <span className={isDark ? "text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full" : "text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full"}>
                      {dept.employeeCount} employee{dept.employeeCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                ))
              ) : (
                <p className={isDark ? "text-gray-400" : "text-blue-600"}>No department data</p>
              )}
            </div>
          </div>

          {/* Leave Today Section (spans 2 columns) */}
          <div className={isDark ? "lg:col-span-2 bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6" : "lg:col-span-2 bg-white rounded-xl shadow-sm border border-blue-100 p-6"}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={isDark ? "text-lg font-semibold text-white" : "text-lg font-semibold text-blue-900"}>
                On Leave Today
              </h2>
              <button className={isDark ? "text-sm text-blue-400 hover:text-blue-300 font-medium" : "text-sm text-blue-600 hover:text-blue-800 font-medium"}>
                View All →
              </button>
            </div>

            {/* Leave List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {leaveToday.length > 0 ? (
                leaveToday.map((person) => (
                  <div key={person.name} className={isDark ? "border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors" : "border border-blue-100 rounded-lg p-4 hover:bg-blue-50 transition-colors"}>
                    <div className="flex items-center space-x-4">
                      <div className={isDark ? "w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center" : "w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"}>
                        <span className={isDark ? "text-gray-300 text-lg font-bold" : "text-blue-600 text-lg font-bold"}>{person.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className={isDark ? "font-medium text-white" : "font-medium text-blue-900"}>{person.name}</h3>
                        <p className={isDark ? "text-sm text-gray-400" : "text-sm text-blue-600"}>{person.department} Department</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        person.type === "Sick Leave" ? (isDark ? "bg-red-900 text-red-300" : "bg-blue-100 text-blue-700") :
                        person.type === "Personal Leave" ? (isDark ? "bg-yellow-900 text-yellow-300" : "bg-blue-200 text-blue-800") :
                        (isDark ? "bg-green-900 text-green-300" : "bg-blue-300 text-blue-900")
                      }`}>
                        {person.type}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className={isDark ? "text-gray-400 col-span-2" : "text-blue-600 col-span-2"}>No one on leave today</p>
              )}
            </div>

            {/* Today's Schedule */}
            <div className={isDark ? "border-t border-gray-700 pt-6" : "border-t border-blue-100 pt-6"}>
              <h3 className={isDark ? "text-lg font-semibold text-white mb-4" : "text-lg font-semibold text-blue-900 mb-4"}>
                Today's Schedule
              </h3>
              <div className="space-y-3">
                {scheduleToday.length > 0 ? (
                  scheduleToday.map((activity, index) => (
                    <div key={index} className={isDark ? "flex items-start space-x-4 p-3 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors" : "flex items-start space-x-4 p-3 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors"}>
                      <div className={`w-2 h-full rounded ${
                        index === 0 ? "bg-blue-600" :
                        index === 1 ? "bg-blue-500" :
                        "bg-blue-400"
                      }`}></div>
                      <div className="flex-1">
                        <p className={isDark ? "font-medium text-white" : "font-medium text-blue-900"}>{activity.title}</p>
                        <p className={isDark ? "text-sm text-gray-400" : "text-sm text-blue-600"}>{activity.time}</p>
                      </div>
                      <span className={isDark ? "text-xs font-medium text-blue-300 bg-gray-700 px-2 py-1 rounded" : "text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded"}>
                        {activity.type}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className={isDark ? "text-gray-400" : "text-blue-600"}>No schedule for today</p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className={isDark ? "mt-6 pt-6 border-t border-gray-700" : "mt-6 pt-6 border-t border-blue-100"}>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-blue-900"}>{quickStats.projects}</p>
                  <p className={isDark ? "text-sm text-gray-400" : "text-sm text-blue-600"}>Projects</p>
                </div>
                <div className="text-center">
                  <p className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-blue-900"}>{quickStats.meetings}</p>
                  <p className={isDark ? "text-sm text-gray-400" : "text-sm text-blue-600"}>Meetings</p>
                </div>
                <div className="text-center">
                  <p className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-blue-900"}>{formatCurrency(quickStats.retirement)}</p>
                  <p className={isDark ? "text-sm text-gray-400" : "text-sm text-blue-600"}>Retirement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
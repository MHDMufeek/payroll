import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import TopNav from "../components/TopNav";
import { useTheme } from "../context/ThemeContext";
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from "recharts";

const Report = () => {
  const { isDark } = useTheme();

  // State for all data
  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0], // first day of current month
    endDate: new Date().toISOString().split('T')[0]
  });
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Fetch all data on mount
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError("");
      try {
        const [
          leavesRes,
          attendanceRes,
          payrollRes,
          employeesRes,
          departmentsRes,
          auditRes
        ] = await Promise.allSettled([
          axios.get("http://localhost:5000/leaves"),
          axios.get("http://localhost:5000/attendance"),
          axios.get("http://localhost:5000/payroll"),
          axios.get("http://localhost:5000/employees"),
          axios.get("http://localhost:5000/departments"),
          axios.get("http://localhost:5000/audit-logs")
        ]);

        if (leavesRes.status === "fulfilled") setLeaves(leavesRes.value.data || []);
        else console.error("Leaves fetch failed", leavesRes.reason);

        if (attendanceRes.status === "fulfilled") setAttendance(attendanceRes.value.data || []);
        else console.error("Attendance fetch failed", attendanceRes.reason);

        if (payrollRes.status === "fulfilled") setPayroll(payrollRes.value.data || []);
        else console.error("Payroll fetch failed", payrollRes.reason);

        if (employeesRes.status === "fulfilled") setEmployees(employeesRes.value.data || []);
        else console.error("Employees fetch failed", employeesRes.reason);

        if (departmentsRes.status === "fulfilled") setDepartments(departmentsRes.value.data || []);
        else console.error("Departments fetch failed", departmentsRes.reason);

        if (auditRes.status === "fulfilled") setAuditLogs(auditRes.value.data || []);
        else console.error("Audit logs fetch failed", auditRes.reason);

      } catch (err) {
        setError("Failed to load report data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Filter data by department and date range
  const filteredEmployees = useMemo(() => {
    if (selectedDepartment === "all") return employees;
    return employees.filter(emp => emp.department === selectedDepartment);
  }, [employees, selectedDepartment]);

  const filteredAttendance = useMemo(() => {
    let filtered = attendance;
    if (selectedDepartment !== "all") {
      const deptEmployeeIds = new Set(employees.filter(e => e.department === selectedDepartment).map(e => e.id));
      filtered = filtered.filter(a => deptEmployeeIds.has(a.employeeId));
    }
    // Filter by date range
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    end.setHours(23, 59, 59, 999);
    return filtered.filter(a => {
      const d = new Date(a.date);
      return d >= start && d <= end;
    });
  }, [attendance, employees, selectedDepartment, dateRange]);

  const filteredLeaves = useMemo(() => {
    let filtered = leaves;
    if (selectedDepartment !== "all") {
      const deptEmployeeIds = new Set(employees.filter(e => e.department === selectedDepartment).map(e => e.id));
      filtered = filtered.filter(l => deptEmployeeIds.has(l.emp_id));
    }
    // Filter by date range based on from_date or to_date? We'll use from_date as proxy
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    end.setHours(23, 59, 59, 999);
    return filtered.filter(l => {
      const d = new Date(l.from_date);
      return d >= start && d <= end;
    });
  }, [leaves, employees, selectedDepartment, dateRange]);

  const filteredPayroll = useMemo(() => {
    let filtered = payroll;
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(p => p.department === selectedDepartment);
    }
    // Filter by pay period? For simplicity, assume payPeriod contains date range string, we'll skip
    return filtered;
  }, [payroll, selectedDepartment]);

  // Summary metrics
  const summary = useMemo(() => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(e => e.status === "active").length;
    const presentToday = attendance.filter(a => {
      const today = new Date().toISOString().split('T')[0];
      return a.date === today && a.status === "present";
    }).length;
    const onLeaveToday = leaves.filter(l => {
      const today = new Date().toISOString().split('T')[0];
      return l.status === "approved" && l.from_date <= today && l.to_date >= today;
    }).length;
    const pendingLeaves = leaves.filter(l => l.status === "pending").length;
    const currentMonthPayroll = payroll.filter(p => {
      // Assume payPeriod like "Jan 1-15, 2024" - crude check
      const currentMonth = new Date().toLocaleString('default', { month: 'short' });
      return p.payPeriod?.includes(currentMonth);
    }).reduce((sum, p) => sum + (parseFloat(p.netSalary?.replace(/[₹,]/g, '')) || 0), 0);
    const totalBudget = departments.reduce((sum, d) => sum + (parseFloat(d.payrollBudget?.replace(/[₹,]/g, '')) || 0), 0);
    const avgPerformance = employees.reduce((sum, e) => sum + (e.performance || 0), 0) / (employees.length || 1);

    return {
      totalEmployees,
      activeEmployees,
      presentToday,
      onLeaveToday,
      pendingLeaves,
      currentMonthPayroll,
      totalBudget,
      avgPerformance: avgPerformance.toFixed(1)
    };
  }, [employees, attendance, leaves, payroll, departments]);

  // Chart data: Leave by status
  const leaveStatusData = useMemo(() => {
    const counts = { pending: 0, approved: 0, rejected: 0 };
    filteredLeaves.forEach(l => counts[l.status] = (counts[l.status] || 0) + 1);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredLeaves]);

  // Monthly leave trend
  const monthlyLeaveData = useMemo(() => {
    const months = {};
    leaves.forEach(l => {
      if (!l.from_date) return;
      const month = l.from_date.substring(0, 7); // YYYY-MM
      months[month] = (months[month] || 0) + 1;
    });
    return Object.entries(months)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-12);
  }, [leaves]);

  // Attendance source distribution
  const attendanceSourceData = useMemo(() => {
    const counts = { biometric: 0, manual: 0, hybrid: 0 };
    filteredAttendance.forEach(a => counts[a.source] = (counts[a.source] || 0) + 1);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredAttendance]);

  // Daily attendance summary (for bar chart)
  const dailyAttendanceData = useMemo(() => {
    const days = {};
    filteredAttendance.forEach(a => {
      if (!a.date) return;
      if (!days[a.date]) days[a.date] = { present: 0, late: 0, absent: 0, total: 0 };
      if (a.status === 'present') days[a.date].present += 1;
      else if (a.status === 'late') days[a.date].late += 1;
      else if (a.status === 'absent') days[a.date].absent += 1;
      days[a.date].total += 1;
    });
    return Object.entries(days)
      .map(([date, counts]) => ({ date, ...counts }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-14); // last 14 days
  }, [filteredAttendance]);

  // Payroll monthly total
  const monthlyPayrollData = useMemo(() => {
    const months = {};
    payroll.forEach(p => {
      // Crude extraction: assume payPeriod like "Jan 1-15, 2024"
      const match = p.payPeriod?.match(/(\w{3}) \d{1,2}-\d{1,2}, (\d{4})/);
      if (match) {
        const month = `${match[2]}-${match[1]}`; // e.g., "2024-Jan"
        const net = parseFloat(p.netSalary?.replace(/[₹,]/g, '')) || 0;
        months[month] = (months[month] || 0) + net;
      }
    });
    return Object.entries(months)
      .map(([month, total]) => ({ month, total }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-12);
  }, [payroll]);

  // Department distribution
  const departmentEmployeeData = useMemo(() => {
    const deptCounts = {};
    employees.forEach(e => {
      deptCounts[e.department] = (deptCounts[e.department] || 0) + 1;
    });
    return Object.entries(deptCounts).map(([name, count]) => ({ name, count }));
  }, [employees]);

  // Gender diversity
  const genderData = useMemo(() => {
    const counts = { Male: 0, Female: 0, Other: 0 };
    employees.forEach(e => {
      const gender = e.personalInfo?.gender || e.gender;
      if (gender) counts[gender] = (counts[gender] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [employees]);

  // Recent audit logs
  const recentAudit = useMemo(() => auditLogs.slice(0, 10), [auditLogs]);

  // Department summary table
  const departmentSummary = useMemo(() => {
    return departments.map(d => ({
      ...d,
      employeeCount: employees.filter(e => e.department === d.name).length,
      // actual spend not available yet
    }));
  }, [departments, employees]);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF'];

  if (loading) {
    return (
      <div className={isDark ? "min-h-screen bg-gray-900" : "min-h-screen bg-gray-50"}>
        <TopNav />
        <div className="p-6 flex justify-center items-center h-64">
          <div className="text-lg">Loading report data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={isDark ? "min-h-screen bg-gray-900" : "min-h-screen bg-gray-50"}>
        <TopNav />
        <div className="p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={isDark ? "min-h-screen bg-gray-900" : "min-h-screen bg-gray-50"}>
      <TopNav />

      <div className="p-4 md:p-6 space-y-6">
        {/* Header with filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-gray-900"}>
            Reports & Analytics
          </h1>
          <div className="flex flex-wrap gap-3">
            {/* Date Range */}
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className={isDark ? "bg-gray-800 border border-gray-600 text-white px-3 py-1.5 rounded" : "border border-gray-300 px-3 py-1.5 rounded"}
              />
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>to</span>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className={isDark ? "bg-gray-800 border border-gray-600 text-white px-3 py-1.5 rounded" : "border border-gray-300 px-3 py-1.5 rounded"}
              />
            </div>
            {/* Department filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className={isDark ? "bg-gray-800 border border-gray-600 text-white px-3 py-1.5 rounded" : "border border-gray-300 px-3 py-1.5 rounded"}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
            {/* Export buttons */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Export PDF
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Export Excel
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card title="Total Employees" value={summary.totalEmployees} icon="👥" isDark={isDark} />
          <Card title="Active Employees" value={summary.activeEmployees} icon="✅" isDark={isDark} />
          <Card title="Present Today" value={summary.presentToday} icon="📋" isDark={isDark} />
          <Card title="On Leave Today" value={summary.onLeaveToday} icon="🏖️" isDark={isDark} />
          <Card title="Pending Leaves" value={summary.pendingLeaves} icon="⏳" isDark={isDark} />
          <Card title="Payroll This Month" value={`₹${summary.currentMonthPayroll.toLocaleString()}`} icon="💰" isDark={isDark} />
          <Card title="Total Budget" value={`₹${summary.totalBudget.toLocaleString()}`} icon="📊" isDark={isDark} />
          <Card title="Avg Performance" value={summary.avgPerformance} icon="⭐" isDark={isDark} />
        </div>

        {/* Leave Reports */}
        <Section title="Leave Reports" isDark={isDark}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Leave by Status" isDark={isDark}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={leaveStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leaveStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Monthly Leave Trend" isDark={isDark}>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyLeaveData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
          {/* Recent leaves table */}
          <div className="mt-4 overflow-x-auto">
            <h3 className={`font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Recent Leave Applications</h3>
            <table className={`min-w-full divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
              <thead className={isDark ? "bg-gray-800" : "bg-gray-50"}>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Employee</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Department</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Date Range</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Reason</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
                {leaves.slice(0, 5).map(leave => {
                  const emp = employees.find(e => e.id === leave.emp_id);
                  return (
                    <tr key={leave.id}>
                      <td className="px-4 py-2">{emp?.name || leave.name}</td>
                      <td className="px-4 py-2">{emp?.department || '-'}</td>
                      <td className="px-4 py-2">{leave.from_date} — {leave.to_date}</td>
                      <td className="px-4 py-2">{leave.reason}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs ${leave.status === 'approved' ? 'bg-green-100 text-green-800' : leave.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Attendance Reports */}
        <Section title="Attendance Reports" isDark={isDark}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Attendance by Source" isDark={isDark}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={attendanceSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {attendanceSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Daily Attendance (Last 14 Days)" isDark={isDark}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dailyAttendanceData}>
                  <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} interval={0} />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" stackId="a" fill="#00C49F" />
                  <Bar dataKey="late" stackId="a" fill="#FFBB28" />
                  <Bar dataKey="absent" stackId="a" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
          {/* Top latecomers table */}
          <div className="mt-4">
            <h3 className={`font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Top Latecomers</h3>
            {/* Implementation skipped for brevity; would need to compute from attendance */}
            <p className="text-gray-500">Coming soon...</p>
          </div>
        </Section>

        {/* Payroll Reports */}
        <Section title="Payroll Reports" isDark={isDark}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Monthly Payroll Total" isDark={isDark}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyPayrollData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="total" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Payroll Status" isDark={isDark}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Paid', value: payroll.filter(p => p.status === 'Paid').length },
                      { name: 'Pending', value: payroll.filter(p => p.status === 'Pending').length },
                      { name: 'Processing', value: payroll.filter(p => p.status === 'Processing').length }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#00C49F" />
                    <Cell fill="#FFBB28" />
                    <Cell fill="#0088FE" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
          {/* Pending payments table */}
          <div className="mt-4 overflow-x-auto">
            <h3 className={`font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Pending Payments</h3>
            <table className={`min-w-full divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
              <thead className={isDark ? "bg-gray-800" : "bg-gray-50"}>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Employee</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Department</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Pay Period</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Net Salary</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
                {payroll.filter(p => p.status === 'Pending').slice(0, 5).map(p => (
                  <tr key={p.id}>
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.department}</td>
                    <td className="px-4 py-2">{p.payPeriod}</td>
                    <td className="px-4 py-2">{p.netSalary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Employee Reports */}
        <Section title="Employee Reports" isDark={isDark}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Employees by Department" isDark={isDark}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={departmentEmployeeData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Gender Diversity" isDark={isDark}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Section>

        {/* Department Reports */}
        <Section title="Department Reports" isDark={isDark}>
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
              <thead className={isDark ? "bg-gray-800" : "bg-gray-50"}>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Department</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Manager</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Employees</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Budget</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Actual Spend</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Utilization</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
                {departmentSummary.map(dept => {
                  const budgetNum = parseFloat(dept.payrollBudget?.replace(/[₹,]/g, '')) || 0;
                  const actualNum = 0; // Not available yet
                  const utilization = budgetNum ? ((actualNum / budgetNum) * 100).toFixed(1) : '0.0';
                  return (
                    <tr key={dept.id}>
                      <td className="px-4 py-2 font-medium">{dept.name}</td>
                      <td className="px-4 py-2">{dept.manager}</td>
                      <td className="px-4 py-2">{dept.employeeCount}</td>
                      <td className="px-4 py-2">{dept.payrollBudget}</td>
                      <td className="px-4 py-2">₹0</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <span>{utilization}%</span>
                          <div className="w-20 h-2 bg-gray-200 rounded">
                            <div className="h-2 bg-blue-600 rounded" style={{ width: `${Math.min(utilization, 100)}%` }}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Recent Activities */}
        <Section title="Recent Activities" isDark={isDark}>
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
              <thead className={isDark ? "bg-gray-800" : "bg-gray-50"}>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Timestamp</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Action</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Description</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">User</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
                {recentAudit.map(log => (
                  <tr key={log.id}>
                    <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${log.action === 'CREATE' ? 'bg-green-100 text-green-800' : log.action === 'UPDATE' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-2">{log.description}</td>
                    <td className="px-4 py-2">{log.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  );
};

// Helper components
const Card = ({ title, value, icon, isDark }) => (
  <div className={isDark ? "bg-gray-800 p-4 rounded-xl border border-gray-700" : "bg-white p-4 rounded-xl border border-gray-200"}>
    <div className="flex items-center justify-between">
      <div>
        <p className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>{title}</p>
        <p className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-gray-900"}>{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  </div>
);

const Section = ({ title, children, isDark }) => (
  <div className={isDark ? "bg-gray-800 rounded-xl p-6 border border-gray-700" : "bg-white rounded-xl p-6 border border-gray-200"}>
    <h2 className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>{title}</h2>
    {children}
  </div>
);

const ChartCard = ({ title, children, isDark }) => (
  <div className={isDark ? "bg-gray-700/50 p-4 rounded-lg" : "bg-gray-50 p-4 rounded-lg"}>
    <h3 className={`font-medium mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}>{title}</h3>
    {children}
  </div>
);

export default Report;
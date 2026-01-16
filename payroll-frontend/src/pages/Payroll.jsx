import { useState } from "react";
import TopNav from "../components/TopNav";
import { useTheme } from "../context/ThemeContext";

const Payroll = () => {
  const { isDark } = useTheme();
  const [rows, setRows] = useState([
    { 
      id: 1, 
      name: "Pooja Sharma", 
      department: "HR", 
      payPeriod: "Jan 1-15, 2024", 
      basicSalary: "₹30,000",
      allowances: [
        { name: "HRA", amount: "₹8,000" },
        { name: "Medical", amount: "₹2,000" },
        { name: "Travel", amount: "₹1,500" }
      ],
      totalAllowances: "₹11,500",
      deductions: [
        { name: "PF", amount: "₹3,000" },
        { name: "Tax", amount: "₹1,500" }
      ],
      totalDeductions: "₹4,500",
      netSalary: "₹40,000", 
      status: "Paid",
      paymentDate: "Jan 15, 2024"
    },
    { 
      id: 2, 
      name: "Kumar Patel", 
      department: "IT", 
      payPeriod: "Jan 1-15, 2024", 
      basicSalary: "₹35,000",
      allowances: [
        { name: "HRA", amount: "₹7,000" },
        { name: "Medical", amount: "₹1,500" }
      ],
      totalAllowances: "₹8,500",
      deductions: [
        { name: "PF", amount: "₹3,500" },
        { name: "Tax", amount: "₹2,000" }
      ],
      totalDeductions: "₹5,500",
      netSalary: "₹35,000", 
      status: "Pending",
      paymentDate: "-"
    },
    { 
      id: 3, 
      name: "Mohan Singh", 
      department: "Finance", 
      payPeriod: "Jan 1-15, 2024", 
      basicSalary: "₹38,000",
      allowances: [
        { name: "HRA", amount: "₹9,000" },
        { name: "Medical", amount: "₹2,500" },
        { name: "Travel", amount: "₹2,000" }
      ],
      totalAllowances: "₹13,500",
      deductions: [
        { name: "PF", amount: "₹4,000" },
        { name: "Tax", amount: "₹2,500" }
      ],
      totalDeductions: "₹6,500",
      netSalary: "₹35,000", 
      status: "Processing",
      paymentDate: "Jan 16, 2024"
    },
  ]);

  const [query, setQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showGenerateForm, setShowGenerateForm] = useState(false);
  const [showAllowancesModal, setShowAllowancesModal] = useState(null);
  const [showDeductionsModal, setShowDeductionsModal] = useState(null);
  
  const [form, setForm] = useState({
    employeeId: "",
    employeeName: "",
    department: "",
    payPeriod: "Jan 1-15, 2024",
    basicSalary: "",
    allowances: [
      { name: "HRA", amount: "" },
      { name: "Medical Allowance", amount: "" },
      { name: "Travel Allowance", amount: "" },
      { name: "Bonus", amount: "" },
      { name: "Overtime", amount: "" }
    ],
    deductions: [
      { name: "Provident Fund", amount: "" },
      { name: "Professional Tax", amount: "" },
      { name: "Income Tax", amount: "" },
      { name: "Insurance", amount: "" }
    ]
  });

  const payPeriods = ["All", "Jan 1-15, 2024", "Dec 16-31, 2023", "Dec 1-15, 2023"];
  const statusOptions = ["All", "Paid", "Pending", "Processing"];
  const departments = ["HR", "IT", "Finance", "Marketing", "Operations"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAllowanceChange = (index, value) => {
    const updatedAllowances = [...form.allowances];
    updatedAllowances[index].amount = value;
    setForm(prev => ({ ...prev, allowances: updatedAllowances }));
  };

  const handleDeductionChange = (index, value) => {
    const updatedDeductions = [...form.deductions];
    updatedDeductions[index].amount = value;
    setForm(prev => ({ ...prev, deductions: updatedDeductions }));
  };

  const calculateTotals = () => {
    const basic = parseFloat(form.basicSalary.replace(/[₹,]/g, '')) || 0;
    const totalAllowances = form.allowances.reduce((sum, allowance) => {
      return sum + (parseFloat(allowance.amount.replace(/[₹,]/g, '')) || 0);
    }, 0);
    const totalDeductions = form.deductions.reduce((sum, deduction) => {
      return sum + (parseFloat(deduction.amount.replace(/[₹,]/g, '')) || 0);
    }, 0);
    const netSalary = basic + totalAllowances - totalDeductions;
    
    return {
      basic: `₹${basic.toLocaleString()}`,
      totalAllowances: `₹${totalAllowances.toLocaleString()}`,
      totalDeductions: `₹${totalDeductions.toLocaleString()}`,
      netSalary: `₹${netSalary.toLocaleString()}`
    };
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    const totals = calculateTotals();
    
    // In a real app, this would make an API call
    const newPayroll = {
      id: rows.length + 1,
      name: form.employeeName,
      department: form.department,
      payPeriod: form.payPeriod,
      basicSalary: totals.basic,
      allowances: form.allowances.filter(a => a.amount).map(a => ({ name: a.name, amount: `₹${parseFloat(a.amount.replace(/[₹,]/g, ''))?.toLocaleString()}` })),
      totalAllowances: totals.totalAllowances,
      deductions: form.deductions.filter(d => d.amount).map(d => ({ name: d.name, amount: `₹${parseFloat(d.amount.replace(/[₹,]/g, ''))?.toLocaleString()}` })),
      totalDeductions: totals.totalDeductions,
      netSalary: totals.netSalary,
      status: "Pending",
      paymentDate: "-"
    };
    
    setRows(prev => [...prev, newPayroll]);
    alert(`Salary slip generated for ${form.employeeName}\nNet Salary: ${totals.netSalary}`);
    setShowGenerateForm(false);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      employeeId: "",
      employeeName: "",
      department: "",
      payPeriod: "Jan 1-15, 2024",
      basicSalary: "",
      allowances: [
        { name: "HRA", amount: "" },
        { name: "Medical Allowance", amount: "" },
        { name: "Travel Allowance", amount: "" },
        { name: "Bonus", amount: "" },
        { name: "Overtime", amount: "" }
      ],
      deductions: [
        { name: "Provident Fund", amount: "" },
        { name: "Professional Tax", amount: "" },
        { name: "Income Tax", amount: "" },
        { name: "Insurance", amount: "" }
      ]
    });
  };

  const handlePay = (id) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return {
          ...row,
          status: "Paid",
          paymentDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      }
      return row;
    });
    setRows(updatedRows);
    alert("Payment marked as completed!");
  };

  const handleViewSlip = (row) => {
    alert(`Viewing salary slip for ${row.name}\nPeriod: ${row.payPeriod}\nNet Salary: ${row.netSalary}`);
  };

  const handleDownloadPDF = (row) => {
    alert(`Downloading PDF salary slip for ${row.name}`);
    // In a real app, this would trigger a PDF download
  };

  const filtered = rows.filter((r) => {
    const matchesSearch = 
      r.name.toLowerCase().includes(query.toLowerCase()) || 
      String(r.id).includes(query) ||
      r.department.toLowerCase().includes(query.toLowerCase());
    
    const matchesPeriod = selectedPeriod === "All" || r.payPeriod === selectedPeriod;
    const matchesStatus = selectedStatus === "All" || r.status === selectedStatus;
    
    return matchesSearch && matchesPeriod && matchesStatus;
  });

  // Calculate totals
  const totals = filtered.reduce((acc, row) => {
    const netSalary = parseInt(row.netSalary.replace(/[₹,]/g, '')) || 0;
    const totalAllowances = parseInt(row.totalAllowances.replace(/[₹,]/g, '')) || 0;
    const totalDeductions = parseInt(row.totalDeductions.replace(/[₹,]/g, '')) || 0;
    
    return {
      totalNetSalary: acc.totalNetSalary + netSalary,
      totalAllowances: acc.totalAllowances + totalAllowances,
      totalDeductions: acc.totalDeductions + totalDeductions,
    };
  }, { totalNetSalary: 0, totalAllowances: 0, totalDeductions: 0 });

  return (
    <div className={isDark ? "min-h-screen bg-gray-900" : "min-h-screen bg-gray-50"}>
      <TopNav />

      <div className="p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-gray-900"}>Payroll Management</h1>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>Process and manage employee salary payments</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button 
              onClick={() => alert("Exporting payroll report...")}
              className={isDark ? "px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors flex items-center" : "px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Report
            </button>
            <button 
              onClick={() => setShowGenerateForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Generate Salary Slip
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={isDark ? "bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700" : "bg-white p-6 rounded-xl shadow-sm border border-gray-100"}>
            <div className="flex items-center justify-between">
              <div>
                <p className={isDark ? "text-gray-400 font-medium" : "text-gray-600 font-medium"}>Total Payroll</p>
                <h3 className={isDark ? "text-2xl font-bold text-white mt-2" : "text-2xl font-bold text-gray-900 mt-2"}>₹{totals.totalNetSalary.toLocaleString()}</h3>
              </div>
              <div className={isDark ? "w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center" : "w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"}>
                <span className="text-blue-600 text-xl">💰</span>
              </div>
            </div>
            <p className={isDark ? "text-sm text-gray-400 mt-3" : "text-sm text-gray-500 mt-3"}>Total net salary for selected period</p>
          </div>

          <div className={isDark ? "bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700" : "bg-white p-6 rounded-xl shadow-sm border border-gray-100"}>
            <div className="flex items-center justify-between">
              <div>
                <p className={isDark ? "text-gray-400 font-medium" : "text-gray-600 font-medium"}>Total Allowances</p>
                <h3 className={isDark ? "text-2xl font-bold text-white mt-2" : "text-2xl font-bold text-gray-900 mt-2"}>₹{totals.totalAllowances.toLocaleString()}</h3>
              </div>
              <div className={isDark ? "w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center" : "w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"}>
                <span className="text-green-600 text-xl">➕</span>
              </div>
            </div>
            <p className={isDark ? "text-sm text-gray-400 mt-3" : "text-sm text-gray-500 mt-3"}>Total allowances paid</p>
          </div>

          <div className={isDark ? "bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700" : "bg-white p-6 rounded-xl shadow-sm border border-gray-100"}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium">Total Deductions</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">₹{totals.totalDeductions.toLocaleString()}</h3>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 text-xl">➖</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">Total deductions applied</p>
          </div>

          <div className={isDark ? "bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700" : "bg-white p-6 rounded-xl shadow-sm border border-gray-100"}>
            <div className="flex items-center justify-between">
              <div>
                <p className={isDark ? "text-gray-400 font-medium" : "text-gray-600 font-medium"}>Pending Payments</p>
                <h3 className={isDark ? "text-2xl font-bold text-white mt-2" : "text-2xl font-bold text-gray-900 mt-2"}>
                  {rows.filter(r => r.status === "Pending").length}
                </h3>
              </div>
              <div className={isDark ? "w-12 h-12 bg-yellow-900 rounded-lg flex items-center justify-center" : "w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center"}>
                <span className="text-yellow-600 text-xl">⏳</span>
              </div>
            </div>
            <p className={isDark ? "text-sm text-gray-400 mt-3" : "text-sm text-gray-500 mt-3"}>Awaiting processing</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className={isDark ? "bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 mb-6" : "bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={isDark ? "block text-sm font-medium text-gray-300 mb-1" : "block text-sm font-medium text-gray-700 mb-1"}>
                Search Employee
              </label>
              <div className="relative">
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, ID or department..."
                  className={isDark ? "w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" : "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}
                />
              </div>
            </div>

            <div>
              <label className={isDark ? "block text-sm font-medium text-gray-300 mb-1" : "block text-sm font-medium text-gray-700 mb-1"}>
                Pay Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className={isDark ? "w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" : "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}
              >
                {payPeriods.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={isDark ? "block text-sm font-medium text-gray-300 mb-1" : "block text-sm font-medium text-gray-700 mb-1"}>
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={isDark ? "w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" : "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Payroll Table */}
        <div className={isDark ? "bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden" : "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"}>
          <div className={isDark ? "px-6 py-4 border-b border-gray-700" : "px-6 py-4 border-b border-gray-100"}>
            <h2 className={isDark ? "text-lg font-semibold text-white" : "text-lg font-semibold text-gray-900"}>Employee Salary Records</h2>
            <p className={isDark ? "text-sm text-gray-400 mt-1" : "text-sm text-gray-600 mt-1"}>{filtered.length} records found</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDark ? "bg-gray-700" : "bg-gray-50"}>
                <tr>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Employee</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Department</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Pay Period</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Basic Salary</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Allowances</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Deductions</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Net Salary</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Status</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Payment Date</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Actions</th>
                </tr>
              </thead>
              <tbody className={isDark ? "divide-y divide-gray-700" : "divide-y divide-gray-100"}>
                {filtered.map((row) => (
                  <tr key={row.id} className={isDark ? "hover:bg-gray-700 transition-colors" : "hover:bg-gray-50 transition-colors"}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={isDark ? "w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center" : "w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"}>
                          <span className={isDark ? "text-blue-400 font-bold" : "text-blue-600 font-bold"}>{row.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className={isDark ? "font-medium text-white" : "font-medium text-gray-900"}>{row.name}</p>
                          <p className={isDark ? "text-sm text-gray-400" : "text-sm text-gray-500"}>ID: {row.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={isDark ? "text-gray-300" : "text-gray-700"}>{row.department}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className={isDark ? "text-gray-300" : "text-gray-700"}>{row.payPeriod}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className={isDark ? "font-medium text-white" : "font-medium text-gray-900"}>{row.basicSalary}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setShowAllowancesModal(row)}
                        className={isDark ? "font-medium text-green-400 hover:text-green-300 hover:underline" : "font-medium text-green-600 hover:text-green-700 hover:underline"}
                      >
                        {row.totalAllowances}
                      </button>
                      <p className={isDark ? "text-xs text-gray-400 mt-1" : "text-xs text-gray-500 mt-1"}>Click to view details</p>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setShowDeductionsModal(row)}
                        className={isDark ? "font-medium text-red-400 hover:text-red-300 hover:underline" : "font-medium text-red-600 hover:text-red-700 hover:underline"}
                      >
                        {row.totalDeductions}
                      </button>
                      <p className={isDark ? "text-xs text-gray-400 mt-1" : "text-xs text-gray-500 mt-1"}>Click to view details</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className={isDark ? "font-bold text-white" : "font-bold text-gray-900"}>{row.netSalary}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        row.status === "Paid" 
                          ? (isDark ? "bg-green-900 text-green-300" : "bg-green-100 text-green-600")
                          : row.status === "Pending"
                          ? (isDark ? "bg-yellow-900 text-yellow-300" : "bg-yellow-100 text-yellow-600")
                          : (isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-600")
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`${row.status === "Paid" ? (isDark ? "text-green-400" : "text-green-600") : (isDark ? "text-gray-400" : "text-gray-500")}`}>
                        {row.paymentDate}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleViewSlip(row)}
                          className={isDark ? "text-blue-400 hover:text-blue-300 p-1.5 rounded hover:bg-gray-600 transition-colors" : "text-blue-600 hover:text-blue-700 p-1.5 rounded hover:bg-blue-50 transition-colors"} 
                          title="View Slip"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDownloadPDF(row)}
                          className={isDark ? "text-green-400 hover:text-green-300 p-1.5 rounded hover:bg-gray-600 transition-colors" : "text-green-600 hover:text-green-700 p-1.5 rounded hover:bg-green-50 transition-colors"} 
                          title="Download PDF"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                        {row.status !== "Paid" && (
                          <button 
                            onClick={() => handlePay(row.id)}
                            className={isDark ? "text-purple-400 hover:text-purple-300 p-1.5 rounded hover:bg-gray-600 transition-colors" : "text-purple-600 hover:text-purple-700 p-1.5 rounded hover:bg-purple-50 transition-colors"} 
                            title="Mark as Paid"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Generate Salary Slip Modal */}
        {showGenerateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Generate Salary Slip</h3>
                  <button
                    onClick={() => { setShowGenerateForm(false); resetForm(); }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleGenerate}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Employee Information */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700 border-b pb-2">Employee Information</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Employee ID *
                        </label>
                        <input
                          type="text"
                          name="employeeId"
                          value={form.employeeId}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter employee ID"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Employee Name *
                        </label>
                        <input
                          type="text"
                          name="employeeName"
                          value={form.employeeName}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter employee name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Department *
                        </label>
                        <select
                          name="department"
                          value={form.department}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Department</option>
                          {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pay Period *
                        </label>
                        <select
                          name="payPeriod"
                          value={form.payPeriod}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Jan 1-15, 2024">Jan 1-15, 2024</option>
                          <option value="Dec 16-31, 2023">Dec 16-31, 2023</option>
                          <option value="Dec 1-15, 2023">Dec 1-15, 2023</option>
                          <option value="Nov 16-30, 2023">Nov 16-30, 2023</option>
                        </select>
                      </div>
                    </div>

                    {/* Basic Salary & Allowances */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700 border-b pb-2">Basic Salary & Allowances</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Basic Salary (₹) *
                        </label>
                        <input
                          type="text"
                          name="basicSalary"
                          value={form.basicSalary}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter basic salary"
                        />
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Allowances</h5>
                        <div className="space-y-3">
                          {form.allowances.map((allowance, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <span className="text-sm text-gray-600 min-w-[120px]">{allowance.name}</span>
                              <input
                                type="text"
                                value={allowance.amount}
                                onChange={(e) => handleAllowanceChange(index, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="₹ Amount"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Deductions */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700 border-b pb-2">Deductions</h4>
                      <div>
                        <div className="space-y-3">
                          {form.deductions.map((deduction, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <span className="text-sm text-gray-600 min-w-[120px]">{deduction.name}</span>
                              <input
                                type="text"
                                value={deduction.amount}
                                onChange={(e) => handleDeductionChange(index, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="₹ Amount"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Summary */}
                      <div className="pt-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Salary Summary</h5>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Basic Salary:</span>
                            <span className="font-medium">{calculateTotals().basic}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Allowances:</span>
                            <span className="font-medium text-green-600">{calculateTotals().totalAllowances}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Deductions:</span>
                            <span className="font-medium text-red-600">{calculateTotals().totalDeductions}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-medium text-gray-700">Net Salary:</span>
                            <span className="font-bold text-lg text-blue-600">{calculateTotals().netSalary}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => { setShowGenerateForm(false); resetForm(); }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Generate Salary Slip
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Allowances Details Modal */}
        {showAllowancesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Allowances Details</h3>
                  <button
                    onClick={() => setShowAllowancesModal(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600">Employee: <span className="font-medium">{showAllowancesModal.name}</span></p>
                  <p className="text-gray-600">Period: <span className="font-medium">{showAllowancesModal.payPeriod}</span></p>
                </div>
                
                <div className="space-y-3">
                  {showAllowancesModal.allowances.map((allowance, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{allowance.name}</span>
                      <span className="font-medium text-green-600">{allowance.amount}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="font-medium text-gray-900">Total Allowances</span>
                    <span className="font-bold text-green-700">{showAllowancesModal.totalAllowances}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Deductions Details Modal */}
        {showDeductionsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Deductions Details</h3>
                  <button
                    onClick={() => setShowDeductionsModal(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600">Employee: <span className="font-medium">{showDeductionsModal.name}</span></p>
                  <p className="text-gray-600">Period: <span className="font-medium">{showDeductionsModal.payPeriod}</span></p>
                </div>
                
                <div className="space-y-3">
                  {showDeductionsModal.deductions.map((deduction, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{deduction.name}</span>
                      <span className="font-medium text-red-600">{deduction.amount}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <span className="font-medium text-gray-900">Total Deductions</span>
                    <span className="font-bold text-red-700">{showDeductionsModal.totalDeductions}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payroll;
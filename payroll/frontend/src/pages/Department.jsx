// Department.jsx
import { useState, useEffect } from "react";
import axios from 'axios';
import TopNav from "../components/TopNav";
import { useTheme } from "../context/ThemeContext";

const Department = () => {
  const { isDark } = useTheme();
  const [departments, setDepartments] = useState([
   
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    manager: "",
    payrollBudget: "",
    status: "Active"
  });

  const handleAddDepartment = () => {
    setEditingDepartment(null);
    setFormData({
      name: "",
      manager: "",
      payrollBudget: "",
      status: "Active"
    });
    setShowModal(true);
  };

  const handleEditDepartment = (dept) => {
    setEditingDepartment(dept);
    setFormData({
      name: dept.name,
      manager: dept.manager,
      payrollBudget: dept.payrollBudget,
      status: dept.status
    });
    setShowModal(true);
  };

  const handleDeleteDepartment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      await axios.delete(`http://localhost:5000/departments/${id}`);
      setDepartments(departments.filter(dept => dept.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete department');
    }
  };

  const parseCurrencyToNumber = (str) => {
    if (!str) return 0;
    const num = str.replace(/[^0-9.]/g, '');
    return parseFloat(num) || 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      manager: formData.manager,
      employee_count: editingDepartment ? (editingDepartment.employeeCount || 0) : 0,
      payroll_budget: parseCurrencyToNumber(formData.payrollBudget),
      status: formData.status
    };

    try {
      if (editingDepartment) {
        await axios.put(`http://localhost:5000/departments/${editingDepartment.id}`, payload);
        setDepartments(departments.map(d => d.id === editingDepartment.id ? { ...d, name: payload.name, manager: payload.manager, payrollBudget: `₹${Number(payload.payroll_budget).toLocaleString()}`, employeeCount: payload.employee_count, status: payload.status } : d));
      } else {
        const res = await axios.post('http://localhost:5000/departments', payload);
        const createdId = res.data.id;
        const newDept = { id: createdId, name: payload.name, manager: payload.manager, payrollBudget: `₹${Number(payload.payroll_budget).toLocaleString()}`, employeeCount: payload.employee_count, status: payload.status };
        setDepartments([...departments, newDept]);
      }
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save department');
    }
  };

  const totalBudget = departments.reduce((sum, dept) => {
    const budget = (typeof dept.payrollBudget === 'string') ? parseInt(dept.payrollBudget.replace(/[₹,]/g, '')) : Math.round((dept.payrollBudget || 0));
    return sum + (budget || 0);
  }, 0);

  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/departments');
        const mapped = res.data.map(d => ({
          id: d.id,
          name: d.name,
          manager: d.manager,
          employeeCount: d.employee_count,
          payrollBudget: `₹${Number(d.payroll_budget).toLocaleString()}`,
          status: d.status
        }));
        setDepartments(mapped);
      } catch (err) {
        console.error('Failed to fetch departments', err);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div className={isDark ? "min-h-screen bg-gray-900" : "min-h-screen bg-gray-50"}>
      <TopNav />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-gray-900"}>Departments</h1>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>Manage all departments in your organization</p>
          </div>
          <button
            onClick={handleAddDepartment}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Department</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={isDark ? "bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700" : "bg-white p-6 rounded-xl shadow-sm border border-gray-100"}>
            <div className="flex items-center justify-between">
              <div>
                <p className={isDark ? "text-gray-400 font-medium" : "text-gray-600 font-medium"}>Total Departments</p>
                <h3 className={isDark ? "text-2xl font-bold text-white mt-2" : "text-2xl font-bold text-gray-900 mt-2"}>{departments.length}</h3>
              </div>
              <div className={isDark ? "w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center" : "w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"}>
                <span className="text-blue-600 text-xl">🏢</span>
              </div>
            </div>
          </div>

          <div className={isDark ? "bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700" : "bg-white p-6 rounded-xl shadow-sm border border-gray-100"}>
            <div className="flex items-center justify-between">
              <div>
                <p className={isDark ? "text-gray-400 font-medium" : "text-gray-600 font-medium"}>Total Employees</p>
                <h3 className={isDark ? "text-2xl font-bold text-white mt-2" : "text-2xl font-bold text-gray-900 mt-2"}>{totalEmployees}</h3>
              </div>
              <div className={isDark ? "w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center" : "w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"}>
                <span className="text-green-600 text-xl">👥</span>
              </div>
            </div>
          </div>

          <div className={isDark ? "bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700" : "bg-white p-6 rounded-xl shadow-sm border border-gray-100"}>
            <div className="flex items-center justify-between">
              <div>
                <p className={isDark ? "text-gray-400 font-medium" : "text-gray-600 font-medium"}>Total Payroll Budget</p>
                <h3 className={isDark ? "text-2xl font-bold text-white mt-2" : "text-2xl font-bold text-gray-900 mt-2"}>₹{totalBudget.toLocaleString()}</h3>
              </div>
              <div className={isDark ? "w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center" : "w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"}>
                <span className="text-purple-600 text-xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Departments Table */}
        <div className={isDark ? "bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden" : "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"}>
          <div className={isDark ? "px-6 py-4 border-b border-gray-700" : "px-6 py-4 border-b border-gray-100"}>
            <h2 className={isDark ? "text-lg font-semibold text-white" : "text-lg font-semibold text-gray-900"}>Department List</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDark ? "bg-gray-700" : "bg-gray-50"}>
                <tr>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Department</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Manager</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Employees</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Payroll Budget</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className={isDark ? "divide-y divide-gray-700 bg-gray-800" : "divide-y divide-gray-100 bg-white"}>
                {departments.map((dept) => (
                  <tr key={dept.id} className={isDark ? "hover:bg-gray-700 transition-colors" : "hover:bg-gray-50 transition-colors"}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={isDark ? "w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center" : "w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"}>
                          <span className={isDark ? "text-blue-300 font-bold" : "text-blue-600 font-bold"}>{dept.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{dept.name}</p>
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Dept ID: DEPT{dept.id.toString().padStart(3, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{dept.manager}</p>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Manager</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{dept.employeeCount}</span>
                        <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>employees</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{dept.payrollBudget}</p>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>per month</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        dept.status === "Active" 
                          ? (isDark ? "bg-green-900 text-green-200" : "bg-green-100 text-green-600")
                          : (isDark ? "bg-red-900 text-red-200" : "bg-red-100 text-red-600")
                      }`}>
                        {dept.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditDepartment(dept)}
                          className={isDark ? "text-blue-400 hover:text-blue-300 p-1.5 rounded hover:bg-gray-700 transition-colors" : "text-blue-600 hover:text-blue-700 p-1.5 rounded hover:bg-blue-50 transition-colors"}
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteDepartment(dept.id)}
                          className={isDark ? "text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-gray-700 transition-colors" : "text-red-600 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors"}
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <button
                          className={isDark ? "text-gray-400 hover:text-gray-300 p-1.5 rounded hover:bg-gray-700 transition-colors" : "text-gray-600 hover:text-gray-700 p-1.5 rounded hover:bg-gray-100 transition-colors"}
                          title="View Details"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Distribution Chart */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Employee Distribution</h3>
            <div className="space-y-4">
              {departments.map((dept) => {
                const percentage = (dept.employeeCount / totalEmployees) * 100;
                return (
                  <div key={dept.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{dept.name}</span>
                      <span className="text-gray-500">{dept.employeeCount} employees ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          dept.id === 1 ? "bg-blue-600" :
                          dept.id === 2 ? "bg-purple-600" :
                          dept.id === 3 ? "bg-green-600" :
                          dept.id === 4 ? "bg-yellow-600" :
                          dept.id === 5 ? "bg-pink-600" : "bg-gray-600"
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payroll Budget Allocation</h3>
            <div className="space-y-4">
              {departments.map((dept) => {
                const budget = parseInt(dept.payrollBudget.replace(/[₹,]/g, '')) || 0;
                const percentage = (budget / totalBudget) * 100;
                return (
                  <div key={dept.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        dept.id === 1 ? "bg-blue-500" :
                        dept.id === 2 ? "bg-purple-500" :
                        dept.id === 3 ? "bg-green-500" :
                        dept.id === 4 ? "bg-yellow-500" :
                        dept.id === 5 ? "bg-pink-500" : "bg-gray-500"
                      }`}></div>
                      <span className="font-medium text-gray-700">{dept.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">{dept.payrollBudget}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{percentage.toFixed(1)}% of total</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Department */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingDepartment ? "Edit Department" : "Add New Department"}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter department name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Manager
                  </label>
                  <input
                    type="text"
                    value={formData.manager}
                    onChange={(e) => setFormData({...formData, manager: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter manager name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Payroll Budget *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="text"
                      required
                      value={formData.payrollBudget}
                      onChange={(e) => setFormData({...formData, payrollBudget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter budget amount"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingDepartment ? "Update Department" : "Add Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Department;
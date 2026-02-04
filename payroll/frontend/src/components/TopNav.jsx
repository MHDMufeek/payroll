// TopNav.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const TopNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/", color: "from-blue-500 to-purple-500" },
    { label: "Department", path: "/department", color: "from-green-500 to-emerald-500" },
    { label: "Employees", path: "/employees", color: "from-orange-500 to-red-500" },
    { label: "Attendance", path: "/attendance", color: "from-purple-500 to-pink-500" },
    { label: "Payroll", path: "/payroll", color: "from-yellow-500 to-amber-500" },
    { label: "Reports", path: "/reports", color: "from-cyan-500 to-blue-500" },
     { label: "Leave", path: "/leave", color: "from-cyan-500 to-blue-500" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={isDark ? "bg-gray-800 shadow-xl" : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-xl"}>
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left side: Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">🏢</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">CREXTIO</h1>
              <p className="text-sm text-cyan-100 font-medium">HR Management System</p>
            </div>
          </div>

          {/* Center: Navigation Items */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  isActive(item.path) 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg ring-2 ring-white/30` 
                    : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side: User & Notifications */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors duration-300 transform hover:scale-110"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C13.0294 16 10 12.9706 10 9C10 8.29648 10.0813 7.60547 10.2379 6.938C7.71611 8.28423 6 10.9417 6 14C6 16.4183 7.58172 20 12 20C13.0294 20 10 12.9706 10 9C10 8.29648 10.0813 7.60547 10.2379 6.938C7.71611 8.28423 6 10.9417 6 14Z" />
                </svg>
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative group">
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors group-hover:rotate-12 duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              {/* Notification Dropdown */}
              <div className="absolute right-0 mt-2 w-80 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">3 New</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 bg-blue-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">💼</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">New employee added</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Just now</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-green-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">💰</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Payroll processed</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">5 mins ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-purple-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">📊</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Monthly report ready</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="text-right hidden sm:block">
                <h2 className="font-bold text-white drop-shadow">John Doe</h2>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1"></div>
                  <p className="text-xs text-cyan-100">HR Manager</p>
                </div>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white/30 group-hover:ring-4 transition-all duration-300">
                  JD
                </div>
                {/* User Menu Dropdown */}
                <div className={`absolute right-0 mt-2 w-48 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl transition-all duration-300 z-50 ${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                  <div className="p-3">
                    <div className="flex items-center space-x-3 p-2 mb-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        JD
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">John Doe</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">john@crextio.com</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                        👤 My Profile
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors" onClick={() => { navigate("/change-password"); setDropdownOpen(false); }}>
                        🔑 Change Password
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                        ⚙️ Settings
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors" onClick={() => { handleLogout(); setDropdownOpen(false); }}>
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`px-4 py-2 text-xs font-bold whitespace-nowrap rounded-lg transition-all ${
                  isActive(item.path) 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-md` 
                    : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
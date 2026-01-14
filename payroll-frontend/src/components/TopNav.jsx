// TopNav.jsx
import { Link, useLocation } from "react-router-dom";

const TopNav = () => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Department", path: "/department" },
    { label: "Employees", path: "/employees" },
    { label: "Attendance", path: "/attendance" },
    { label: "Payroll", path: "/payroll" },
    { label: "Reports", path: "/reports" },
    { label: "Settings", path: "/settings" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left side: Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">🏢</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CREXTIO</h1>
              <p className="text-sm text-gray-500">HR Management</p>
            </div>
          </div>

          {/* Center: Navigation Items */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.path) ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side: User & Notifications */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -right-1"></div>
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <h2 className="font-bold text-gray-900">John Doe</h2>
                <p className="text-xs text-gray-500">HR</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-3 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-lg ${
                  isActive(item.path) ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
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
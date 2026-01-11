const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>

      <ul className="space-y-4 text-gray-700">
        <li className="font-medium cursor-pointer">🏢 Department</li>
        <li className="font-medium cursor-pointer">👥 Employees</li>
        <li className="font-medium cursor-pointer">📅 Attendance</li>
        <li className="font-medium cursor-pointer">💰 Payroll</li>
        <li className="font-medium cursor-pointer">📊 Reports</li>
      </ul>
    </div>
  );
};

export default Sidebar;

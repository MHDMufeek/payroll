import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <StatCard title="Today Attendance" value="50%" />
          <StatCard title="Active Employees" value="4" />
          <StatCard title="Payroll This Month" value="₹140K" />
          <StatCard title="Present Today" value="6" />
          <StatCard title="Pending Payroll" value="0" />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Department Box */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">Department</h2>
            <p className="text-gray-600">HR</p>
            <p className="text-gray-600">IT</p>
            <p className="text-gray-600">Finance</p>
          </div>

          {/* Leave Today */}
          <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-4">On Leave Today</h2>

            <ul className="space-y-3">
              {["Pooja", "Kumar", "Mohan"].map((name) => (
                <li
                  key={name}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span>{name}</span>
                  <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">
                    Leave
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import TopNav from "../components/TopNav";
import StatCard from "../components/StatCard";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const { isDark } = useTheme();
  const leaveData = [
    { name: "Pooja", department: "HR", type: "Sick Leave" },
    { name: "Kumar", department: "IT", type: "Personal Leave" },
    { name: "Mohan", department: "Finance", type: "Annual Leave" },
  ];

  const recentActivities = [
    { time: "08:30 AM - 10:00 AM", title: "New Project Discussion", type: "Meeting" },
    { time: "10:00 AM - 11:00 AM", title: "Team Standup", type: "Daily" },
    { time: "11:00 AM - 12:00 PM", title: "Client Review", type: "Meeting" },
  ];

  return (
    <div className={isDark ? "min-h-screen bg-gray-900" : "min-h-screen bg-blue-50"}>
      <TopNav />
      
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-blue-900"}>Welcome back, John!</h1>
          <p className={isDark ? "text-gray-300" : "text-blue-700"}>Here's what's happening with your team today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className={isDark ? "bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700" : "bg-white p-6 rounded-xl shadow-sm border border-blue-100"}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={isDark ? "text-gray-400 font-medium" : "text-blue-700 font-medium"}>Today Attendance</h3>
              <span className={isDark ? "text-blue-300 font-bold" : "text-blue-600 font-bold"}>50%</span>
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
                  strokeDasharray="188.5 377"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-blue-900"}>50%</span>
              </div>
            </div>
          </div>
          
          <StatCard title="Active Employees" value="4" color="blue" />
          <StatCard title="Payroll This Month" value="₹140K" color="blue" />
          <StatCard title="Present Today" value="6" color="blue" />
          <StatCard title="Pending Payroll" value="0" color="blue" />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department Section */}
          <div className={isDark ? "bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6" : "bg-white rounded-xl shadow-sm border border-blue-100 p-6"}>
            <h2 className={isDark ? "text-lg font-semibold text-white mb-4" : "text-lg font-semibold text-blue-900 mb-4"}>Department</h2>
            <div className="space-y-3">
              {["HR", "IT", "Finance", "Marketing", "Operations"].map((dept, index) => (
                <div key={dept} className={isDark ? "flex items-center justify-between p-3 hover:bg-gray-700 rounded-lg transition-colors" : "flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition-colors"}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      index === 0 ? (isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700") :
                      index === 1 ? (isDark ? "bg-blue-800 text-blue-200" : "bg-blue-200 text-blue-800") :
                      index === 2 ? (isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700") :
                      index === 3 ? (isDark ? "bg-blue-800 text-blue-200" : "bg-blue-200 text-blue-800") :
                      (isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700")
                    }`}>
                      <span className="font-bold">{dept.charAt(0)}</span>
                    </div>
                    <span className={isDark ? "font-medium text-gray-200" : "font-medium text-blue-800"}>{dept}</span>
                  </div>
                  <span className={isDark ? "text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full" : "text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full"}>
                    {index === 0 ? "8 employees" : 
                     index === 1 ? "12 employees" : 
                     index === 2 ? "6 employees" :
                     index === 3 ? "5 employees" : "9 employees"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Leave Today Section */}
          <div className={isDark ? "lg:col-span-2 bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6" : "lg:col-span-2 bg-white rounded-xl shadow-sm border border-blue-100 p-6"}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={isDark ? "text-lg font-semibold text-white" : "text-lg font-semibold text-blue-900"}>On Leave Today</h2>
              <button className={isDark ? "text-sm text-blue-400 hover:text-blue-300 font-medium" : "text-sm text-blue-600 hover:text-blue-800 font-medium"}>
                View All →
              </button>
            </div>
            
            {/* Leave List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {leaveData.map((person, index) => (
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
              ))}
            </div>

            {/* Today's Schedule */}
            <div className={isDark ? "border-t border-gray-700 pt-6" : "border-t border-blue-100 pt-6"}>
              <h3 className={isDark ? "text-lg font-semibold text-white mb-4" : "text-lg font-semibold text-blue-900 mb-4"}>Today's Schedule</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
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
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className={isDark ? "mt-6 pt-6 border-t border-gray-700" : "mt-6 pt-6 border-t border-blue-100"}>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-blue-900"}>85</p>
                  <p className={isDark ? "text-sm text-gray-400" : "text-sm text-blue-600"}>Projects</p>
                </div>
                <div className="text-center">
                  <p className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-blue-900"}>12</p>
                  <p className={isDark ? "text-sm text-gray-400" : "text-sm text-blue-600"}>Meetings</p>
                </div>
                <div className="text-center">
                  <p className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-blue-900"}>₹179K</p>
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
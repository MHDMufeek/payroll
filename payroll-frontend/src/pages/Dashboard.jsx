// Dashboard.jsx (updated - no sidebar)
import TopNav from "../components/TopNav";
import StatCard from "../components/StatCard";

const Dashboard = () => {
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
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600">Here's what's happening with your team today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Today Attendance</h3>
              <span className="text-blue-600 font-bold">50%</span>
            </div>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="188.5 377"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">50%</span>
              </div>
            </div>
          </div>
          
          <StatCard title="Active Employees" value="4" />
          <StatCard title="Payroll This Month" value="₹140K" />
          <StatCard title="Present Today" value="6" />
          <StatCard title="Pending Payroll" value="0" />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Department</h2>
            <div className="space-y-3">
              {["HR", "IT", "Finance", "Marketing", "Operations"].map((dept, index) => (
                <div key={dept} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      index === 0 ? "bg-blue-100 text-blue-600" :
                      index === 1 ? "bg-purple-100 text-purple-600" :
                      index === 2 ? "bg-green-100 text-green-600" :
                      index === 3 ? "bg-yellow-100 text-yellow-600" :
                      "bg-pink-100 text-pink-600"
                    }`}>
                      <span className="font-bold">{dept.charAt(0)}</span>
                    </div>
                    <span className="font-medium text-gray-700">{dept}</span>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
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
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">On Leave Today</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All →
              </button>
            </div>
            
            {/* Leave List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {leaveData.map((person, index) => (
                <div key={person.name} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-lg font-bold">{person.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{person.name}</h3>
                      <p className="text-sm text-gray-500">{person.department} Department</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      person.type === "Sick Leave" ? "bg-red-100 text-red-600" :
                      person.type === "Personal Leave" ? "bg-yellow-100 text-yellow-600" :
                      "bg-blue-100 text-blue-600"
                    }`}>
                      {person.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Today's Schedule */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-2 h-full rounded ${
                      index === 0 ? "bg-blue-500" :
                      index === 1 ? "bg-green-500" :
                      "bg-purple-500"
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {activity.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">85</p>
                  <p className="text-sm text-gray-500">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-sm text-gray-500">Meetings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">₹179K</p>
                  <p className="text-sm text-gray-500">Retirement</p>
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
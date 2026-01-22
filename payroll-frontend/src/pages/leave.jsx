import React, { useState } from 'react';
import { CalendarDays, FileText, History, ChevronDown, CheckCircle2 } from 'lucide-react';
import TopNav from '../components/TopNav';
import { useTheme } from '../context/ThemeContext';

const LeaveManagement = () => {
  const { isDark } = useTheme();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showCompOffModal, setShowCompOffModal] = useState(false);
  const [currentLeaveIndex, setCurrentLeaveIndex] = useState(0);
  const [formData, setFormData] = useState({
    leaveType: 'PAID LEAVE',
    startDate: '',
    endDate: '',
    reason: ''
  });
  
  const leaveTypes = [
    {
      name: 'PAID LEAVE',
      available: '4.2d',
      color: 'from-blue-400 to-blue-600',
      borderColor: 'border-blue-200',
      bgColor: 'bg-blue-50',
      details: {
        available: '4.5 D',
        consumed: '4.5 D',
        accrued: '08 D',
        quota: '12 D'
      }
    },
    {
      name: 'CASUAL LEAVE',
      available: '4.2d',
      color: 'from-orange-400 to-orange-600',
      borderColor: 'border-orange-200',
      bgColor: 'bg-orange-50',
      details: {
        available: '4.5 D',
        consumed: '4.5 D',
        accrued: '08 D',
        quota: '12 D'
      }
    },
    {
      name: 'SICK LEAVE',
      available: '8D',
      color: 'from-green-400 to-green-600',
      borderColor: 'border-green-200',
      bgColor: 'bg-green-50',
      details: {
        available: '4.5 D',
        consumed: '4.5 D',
        accrued: '08 D',
        quota: '12 D'
      }
    },
    {
      name: 'OTHER LEAVES',
      available: '4.5D',
      color: 'from-purple-400 to-purple-600',
      borderColor: 'border-purple-200',
      bgColor: 'bg-purple-50',
      details: {
        available: '4.5 D',
        consumed: '4.5 D',
        accrued: '08 D',
        quota: '12 D'
      }
    }
  ];

  const pastLeaves = [
    {
      date: '24 OCT, WED',
      dateLabel: 'Tomorrow',
      type: 'Paid Leave',
      status: 'Approved',
      statusColor: 'text-green-600',
      note: 'I will be off tomorrow as I plan to take a short break',
      approvedBy: 'Vijay Yalamanchili'
    },
    {
      date: '20 OCT, FRI',
      dateLabel: 'Yesterday, 1 day',
      type: 'Paid Leave',
      status: 'Approved',
      statusColor: 'text-green-600',
      note: 'Need to attend a wedding ceremony of my cousin and I my presence there is needed for all of the week in Bangalore',
      approvedBy: 'Vijay Yalamanchili'
    }
  ];

  const leaveActions = [
    { label: 'Apply for Leave', icon: <ChevronDown size={16} /> },
    { label: 'Request Compensatory Off', icon: null },
    { label: 'Do something', icon: null }
  ];

  const usefulLinks = [
    { label: 'Leave Policy Document', icon: <FileText size={16} /> },
    { label: 'Leave History', icon: <History size={16} /> }
  ];

  return (
    <div className={isDark ? "min-h-screen bg-gray-900" : "min-h-screen bg-gray-50"}>
      <TopNav />
      
      <div className="p-6 w-full">
        <div className="w-full">
          {/* Leave Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
            {leaveTypes.map((leave, index) => (
              <div 
                key={index} 
                className={`rounded-xl p-6 flex flex-col items-center ${
                  isDark ? "bg-gray-800 border border-gray-700" : `${leave.bgColor} border ${leave.borderColor}`
                }`}
              >
                {/* Circular Progress */}
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    {/* Background circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="55"
                      stroke={isDark ? "#374151" : "#e5e7eb"}
                      strokeWidth="8"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="55"
                      stroke={leave.color}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(4.5 / 12) * 345.6} 345.6`}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Center text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-2xl font-bold bg-gradient-to-r ${leave.color} bg-clip-text text-transparent`}>
                      {leave.available}
                    </span>
                    <span className={`text-xs font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      AVAILABLE
                    </span>
                  </div>
                </div>

                {/* Leave Type Name */}
                <h3 className={`text-center text-sm font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                  {leave.name}
                </h3>

                {/* Details */}
                <div className={`text-xs space-y-1 mb-4 w-full ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <div className="flex justify-between">
                    <span>■ Available</span>
                    <span>{leave.details.available}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>■ Consumed</span>
                    <span>{leave.details.consumed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>■ Accrued so far</span>
                    <span>{leave.details.accrued}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>■ Annual Quota</span>
                    <span>{leave.details.quota}</span>
                  </div>
                </div>

                {/* Explain Link */}
                <button 
                  onClick={() => alert(`Details for ${leaveTypes[index].name}:\n\nAvailable: ${leaveTypes[index].details.available}\nConsumed: ${leaveTypes[index].details.consumed}\nAccrued: ${leaveTypes[index].details.accrued}\nQuota: ${leaveTypes[index].details.quota}`)}
                  className="text-cyan-500 text-sm font-semibold hover:text-cyan-600 transition">
                  EXPLAIN
                </button>
              </div>
            ))}
          </div>

          {/* Main Content Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 w-full">
            {/* Past Leaves Section - Takes 3 columns */}
            <div className="lg:col-span-3 w-full">
              <div className={`rounded-xl p-6 ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                    PAST LEAVES
                  </h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setCurrentLeaveIndex(Math.max(0, currentLeaveIndex - 1))}
                      className={`p-2 rounded-lg ${isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} transition`}
                      disabled={currentLeaveIndex === 0}>
                      ←
                    </button>
                    <button 
                      onClick={() => setCurrentLeaveIndex(Math.min(pastLeaves.length - 1, currentLeaveIndex + 1))}
                      className={`p-2 rounded-lg ${isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} transition`}
                      disabled={currentLeaveIndex === pastLeaves.length - 1}>
                      →
                    </button>
                  </div>
                </div>

                {/* Leaves List */}
                <div className="space-y-4">
                  {pastLeaves.map((leave, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-l-4 border-green-500 ${isDark ? "bg-gray-700" : "bg-gray-50"}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                            {leave.date}
                          </div>
                          <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            {leave.dateLabel}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className={`text-xs font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            LEAVE TYPE
                          </div>
                          <div className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                            {leave.type}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className={`text-xs font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            STATUS
                          </div>
                          <div className={`text-sm font-semibold ${leave.statusColor}`}>
                            {leave.status}
                          </div>
                        </div>
                      </div>
                      <p className={`text-sm mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {leave.note}
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className={`text-xs font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            APPROVED BY
                          </div>
                          <div className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                            {leave.approvedBy}
                          </div>
                        </div>
                        <button 
                          onClick={() => alert(`Options for ${leave.type} leave on ${leave.date}`)}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm ${isDark ? "bg-gray-600 text-white hover:bg-gray-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition`}>
                          OPTIONS
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Leave Actions & Useful Links - Takes 1 column */}
            <div className="space-y-6">
              {/* Leave Actions */}
              <div className={`rounded-xl p-6 ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                  LEAVE ACTIONS
                </h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowApplyModal(true)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-between transition">
                    Apply for Leave
                    <ChevronDown size={16} />
                  </button>
                  <button 
                    onClick={() => setShowCompOffModal(true)}
                    className={`w-full text-left text-sm font-semibold py-2 px-4 rounded-lg ${isDark ? "text-cyan-400 hover:bg-gray-700" : "text-cyan-600 hover:bg-gray-50"} transition`}>
                    Request Compensatory Off
                  </button>
                  <button 
                    onClick={() => alert('Feature coming soon!')}
                    className={`w-full text-left text-sm font-semibold py-2 px-4 rounded-lg ${isDark ? "text-cyan-400 hover:bg-gray-700" : "text-cyan-600 hover:bg-gray-50"} transition`}>
                    Do something
                  </button>
                </div>
              </div>

              {/* Useful Links */}
              <div className={`rounded-xl p-6 ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                  USEFUL LINKS
                </h3>
                <div className="space-y-3">
                  {usefulLinks.map((link, index) => (
                    <button 
                      key={index}
                      onClick={() => {
                        if (link.label === 'Leave Policy Document') {
                          alert('Opening Leave Policy Document...');
                        } else if (link.label === 'Leave History') {
                          alert('Opening Leave History...');
                        }
                      }}
                      className={`w-full flex items-center space-x-2 text-left py-2 px-3 rounded-lg font-semibold transition ${
                        isDark 
                          ? "text-cyan-400 hover:bg-gray-700" 
                          : "text-cyan-600 hover:bg-gray-50"
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply for Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl p-6 max-w-md w-full ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Apply for Leave</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Leave application submitted!'); setShowApplyModal(false); }}>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Leave Type</label>
                <select 
                  value={formData.leaveType}
                  onChange={(e) => setFormData({...formData, leaveType: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                >
                  <option>PAID LEAVE</option>
                  <option>CASUAL LEAVE</option>
                  <option>SICK LEAVE</option>
                  <option>OTHER LEAVES</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Start Date</label>
                <input 
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>End Date</label>
                <input 
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Reason</label>
                <textarea 
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                  rows="3"
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition">Submit</button>
                <button type="button" onClick={() => setShowApplyModal(false)} className={`flex-1 font-semibold py-2 rounded-lg transition ${isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Compensatory Off Modal */}
      {showCompOffModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl p-6 max-w-md w-full ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Request Compensatory Off</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Compensatory off request submitted!'); setShowCompOffModal(false); }}>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Date</label>
                <input 
                  type="date"
                  className={`w-full px-3 py-2 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Reason</label>
                <textarea 
                  className={`w-full px-3 py-2 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                  rows="3"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition">Submit</button>
                <button type="button" onClick={() => setShowCompOffModal(false)} className={`flex-1 font-semibold py-2 rounded-lg transition ${isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;

// StatCard.jsx (updated with modern design)
const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <p className="text-gray-600 font-medium mb-2">{title}</p>
      <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>Updated today</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
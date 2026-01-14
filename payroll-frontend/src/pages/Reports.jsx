import TopNav from "../components/TopNav";

const Reports = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />

      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-2">Generate and view various HR reports.</p>
      </div>
    </div>
  );
};

export default Reports;

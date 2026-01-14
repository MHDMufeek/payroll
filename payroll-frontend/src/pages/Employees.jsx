import TopNav from "../components/TopNav";

const Employees = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />

      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <p className="text-gray-600 mt-2">View and manage employee records.</p>
      </div>
    </div>
  );
};

export default Employees;

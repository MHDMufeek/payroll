import TopNav from "../components/TopNav";

const Attendance = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />

      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-600 mt-2">Track daily attendance and time logs.</p>
      </div>
    </div>
  );
};

export default Attendance;

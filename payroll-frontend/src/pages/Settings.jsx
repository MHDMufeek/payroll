import TopNav from "../components/TopNav";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />

      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Application and user settings.</p>
      </div>
    </div>
  );
};

export default Settings;

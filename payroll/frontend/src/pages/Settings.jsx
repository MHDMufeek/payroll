import TopNav from "../components/TopNav";
import { useTheme } from "../context/ThemeContext";

const Settings = () => {
  const { isDark } = useTheme();
  return (
    <div className={isDark ? "min-h-screen bg-gray-900" : "min-h-screen bg-gray-50"}>
      <TopNav />

      <div className="p-6">
        <h1 className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-gray-900"}>Settings</h1>
        <p className={isDark ? "text-gray-400 mt-2" : "text-gray-600 mt-2"}>Application and user settings.</p>
      </div>
    </div>
  );
};

export default Settings;

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/change-password", {
        currentPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Password changed successfully");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError("Failed to change password");
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-blue-50"}`}>
      <div className="p-6">
        <div className={`max-w-md mx-auto p-8 rounded-xl shadow-lg ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-blue-100"}`}>
          <h2 className={`text-2xl font-bold text-center mb-6 ${isDark ? "text-white" : "text-blue-900"}`}>Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-blue-700"}`}>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isDark ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500" : "border-blue-300 focus:ring-blue-500"}`}
                required
              />
            </div>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-blue-700"}`}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isDark ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500" : "border-blue-300 focus:ring-blue-500"}`}
                required
              />
            </div>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-blue-700"}`}>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isDark ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500" : "border-blue-300 focus:ring-blue-500"}`}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
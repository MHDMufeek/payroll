import { useState, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const scorePassword = (pwd) => {
  let score = 0;
  if (!pwd) return { score, label: "Very weak" };
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  const labels = ["Very weak", "Weak", "Okay", "Strong", "Very strong"];
  return { score, label: labels[score] || "Very weak" };
};

const ChangePassword = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = useMemo(() => scorePassword(newPassword), [newPassword]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");  
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Password changed successfully — redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to change password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className={`w-full max-w-md ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"} rounded-2xl shadow-xl p-8`}>
        <div className="flex items-center space-x-3 mb-6">
          <div className={`p-2 rounded-md ${isDark ? 'bg-gray-700/40' : 'bg-blue-50'}`}>
            <svg className={`h-6 w-6 ${isDark ? 'text-white' : 'text-blue-600'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 11a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Change Password</h2>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Update your account credentials securely</p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">{error}</div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded">{success}</div>
          )}

          <div>
            <label htmlFor="current" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Current Password</label>
            <div className="relative">
              <input
                id="current"
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-900 border-gray-700 text-gray-100 focus:ring-indigo-400' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'}`}
                placeholder="Enter current password"
                required
              />

              <button type="button" onClick={() => setShowCurrent(s => !s)} className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm text-gray-500">
                {showCurrent ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="new" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>New Password</label>
            <div className="relative">
              <input
                id="new"
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-900 border-gray-700 text-gray-100 focus:ring-indigo-400' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'}`}
                placeholder="Choose a strong password"
                required
              />

              <button type="button" onClick={() => setShowNew(s => !s)} className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm text-gray-500">
                {showNew ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="mt-2">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div style={{ width: `${(strength.score / 4) * 100}%` }} className={`h-2 rounded-full ${strength.score >= 3 ? 'bg-emerald-500' : strength.score === 2 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
              </div>
              <div className={`mt-1 text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{strength.label}</div>
            </div>
          </div>

          <div>
            <label htmlFor="confirm" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Confirm New Password</label>
            <div className="relative">
              <input
                id="confirm"
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-900 border-gray-700 text-gray-100 focus:ring-indigo-400' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'}`}
                placeholder="Repeat new password"
                required
              />

              <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm text-gray-500">
                {showConfirm ? 'Hide' : 'Show'}
              </button>
            </div>

            {confirmPassword && newPassword !== confirmPassword && (
              <div className="mt-2 text-xs text-red-500">Passwords do not match</div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded-lg text-white font-medium shadow ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:translate-y-[-1px] transition-transform'}`}>
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
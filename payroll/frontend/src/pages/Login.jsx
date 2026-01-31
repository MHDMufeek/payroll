import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isDark } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { username, password }
      );

      login(response.data.token, { remember });
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className={`w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 ${isDark ? "border border-gray-700" : "border border-gray-200"}`}>
        {/* Illustration / Brand */}
        <div className="hidden md:flex flex-col items-center justify-center p-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
            <rect width="24" height="24" rx="6" fill="#fff" opacity="0.12" />
            <path d="M12 7V13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 10H15" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 className="text-2xl font-semibold mb-2">Welcome to HR Payroll</h3>
          <p className="text-sm opacity-90 text-white/90 text-center">Securely manage attendance, payroll and employee data.</p>
        </div>

        {/* Form */}
        <div className="p-8 sm:p-10">
          <div className="mb-6 text-center">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Sign in to your account</h2>
            <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM6 18v-1a4 4 0 014-4h4"></path></svg>
                </span>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-900 border-gray-700 text-gray-100 focus:ring-indigo-400' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'}`}
                  placeholder="jane.doe"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-5a6 6 0 10-12 0v5a2 2 0 002 2z"></path></svg>
                </span>

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-900 border-gray-700 text-gray-100 focus:ring-indigo-400' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'}`}
                  placeholder="••••••••"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm text-gray-500"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.064.162-2.087.46-3.043M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <span className={`ml-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Remember me</span>
              </label>

              <a href="#" className={`text-sm ${isDark ? 'text-indigo-200' : 'text-blue-600'} hover:underline`}>Forgot password?</a>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow hover:translate-y-[-1px] transition-transform"
              >
                Sign in
              </button>
            </div>

            <p className={`text-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Don't have an account? <a href="#" className="text-blue-600 hover:underline">Contact admin</a>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;

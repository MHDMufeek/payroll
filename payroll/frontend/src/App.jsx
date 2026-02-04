import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Department from "./pages/Department";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";
import Reports from "./pages/Reports";
import ManageLeave from "./pages/leave";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import LandingPage from "./pages/homepage";
import ApplyLeave from "./pages/ApplyLeave";

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/change-password" element={user ? <ChangePassword /> : <Navigate to="/login" />} />
        <Route path="/" element={user ? <Dashboard /> : <LandingPage />} />
        <Route path="/apply-leave" element={<ApplyLeave />} />
        <Route path="/department" element={user ? <Department /> : <Navigate to="/login" />} />
        <Route path="/employees" element={user ? <Employees /> : <Navigate to="/login" />} />
        <Route path="/attendance" element={user ? <Attendance /> : <Navigate to="/login" />} />
        <Route path="/payroll" element={user ? <Payroll /> : <Navigate to="/login" />} />
        <Route path="/reports" element={user ? <Reports /> : <Navigate to="/login" />} />
        <Route path="/leave" element={user ? <ManageLeave /> : <Navigate to="/login" />} />
        <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

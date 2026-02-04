import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";

const ApplyLeave = () => {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: "", empId: "", email: "", from: "", to: "", reason: "" });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setSubmitting(true);

    try {
      await axios.post("http://localhost:5000/leaves", {
        name: form.name,
        empId: form.empId,
        from: form.from,
        to: form.to,
        reason: form.reason,
        email: form.email
      });

      setStatus("Application submitted successfully.");
      setForm({ name: "", empId: "", email: "", from: "", to: "", reason: "" });
    } catch (err) {
      console.error("Failed to submit to server", err?.response || err?.message || err);
      // Fallback: save locally so user data isn't lost
      const existing = JSON.parse(localStorage.getItem("leaveApplications") || "[]");
      existing.push({ ...form, submittedAt: new Date().toISOString(), status: "saved_local" });
      localStorage.setItem("leaveApplications", JSON.stringify(existing));
      setStatus("Server unavailable — application saved locally. It will not be sent to HR until the server is reachable.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-lg rounded-2xl shadow-lg p-8 ${isDark ? 'bg-gray-800 border border-gray-700 text-gray-100' : 'bg-white border border-gray-200 text-gray-900'}`}>
        <h2 className="text-2xl font-bold mb-4">Apply for Leave</h2>

        {status && <div className={`${isDark ? 'bg-green-900 border-green-800 text-green-200' : 'bg-green-50 border border-green-200 text-green-700'} px-3 py-2 rounded mb-4`}>{status}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Full name</label>
            <input name="name" value={form.name} onChange={handleChange} required className={`w-full px-3 py-2 rounded border ${isDark ? 'bg-gray-900 border-gray-700 text-gray-100' : ''}`} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Employee ID</label>
            <input name="empId" value={form.empId} onChange={handleChange} required className={`w-full px-3 py-2 rounded border ${isDark ? 'bg-gray-900 border-gray-700 text-gray-100' : ''}`} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">From</label>
              <input type="date" name="from" value={form.from} onChange={handleChange} required className={`w-full px-3 py-2 rounded border ${isDark ? 'bg-gray-900 border-gray-700 text-gray-100' : ''}`} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To</label>
              <input type="date" name="to" value={form.to} onChange={handleChange} required className={`w-full px-3 py-2 rounded border ${isDark ? 'bg-gray-900 border-gray-700 text-gray-100' : ''}`} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" value={form.email} onChange={handleChange} required className={`w-full px-3 py-2 rounded border ${isDark ? 'bg-gray-900 border-gray-700 text-gray-100' : ''}`} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Reason</label>
            <textarea name="reason" value={form.reason} onChange={handleChange} required className={`w-full px-3 py-2 rounded border ${isDark ? 'bg-gray-900 border-gray-700 text-gray-100' : ''}`} rows={4} />
          </div>

          <div>
            <button type="submit" className="w-full py-2 rounded-lg bg-green-600 text-white font-medium">Submit Application</button>
          </div>
        </form>

        <p className="mt-4 text-sm">Are you HR? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link></p>
      </div>
    </div>
  );
};

export default ApplyLeave;

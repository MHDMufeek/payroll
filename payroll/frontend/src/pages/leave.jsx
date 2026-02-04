import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import TopNav from "../components/TopNav";
import { useTheme } from "../context/ThemeContext"; 

const ManageLeave = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { isDark } = useTheme();
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const fetchLeaves = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/leaves", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      setLeaveData(res.data || []);
    } catch (err) {
      console.error("Failed to fetch leaves", err?.response || err?.message || err);
      setLeaveData([]);
      if (err?.response?.status === 401) {
        setFetchError("Unauthorized — please sign in as HR to view leave requests.");
      } else {
        setFetchError("Failed to load leave data. Check server or your network.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const initialLeaveData = leaveData.map((r) => ({
    id: r.id,
    employeeId: r.emp_id,
    employeeName: r.name,
    dates: r.from_date && r.to_date ? `${r.from_date} — ${r.to_date}` : r.submitted_at,
    reason: r.reason,
    email: r.email || "",
    updatedBy: r.processed_by || "",
    status: r.status || "pending",
  }));

  const filtered = useMemo(() => {
    const s = searchTerm.trim().toLowerCase();
    if (!s) return initialLeaveData;
    return initialLeaveData.filter((item) =>
      [
        item.employeeId,
        item.employeeName,
        item.leaveType,
        item.duration,
        item.dates,
        item.reason,
         item.email,
        item.updatedBy,
        item.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(s)
    );
  }, [searchTerm, initialLeaveData]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
  const pageData = filtered.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const [processing, setProcessing] = useState(false);

  const handleUpdateStatus = async (id, newStatus) => {
    setProcessing(true);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/leaves/${id}`,
        { status: newStatus },
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );
      await fetchLeaves();
    } catch (err) {
      console.error("Failed to update leave status", err?.response || err?.message || err);
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this leave application?")) return;
    setProcessing(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/leaves/${id}`, { headers: { Authorization: token ? `Bearer ${token}` : "" } });
      await fetchLeaves();
    } catch (err) {
      console.error("Failed to delete leave", err?.response || err?.message || err);
    } finally {
      setProcessing(false);
    }
  };


  const changeEntries = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <TopNav />

      <div className={`p-6 ${isDark ? 'bg-gray-900 text-gray-100 min-h-screen' : 'bg-gray-50'}`}>
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Manage Leave</h1>
          <hr className={`mt-2 ${isDark ? 'border-gray-700' : ''}`} />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={changeEntries}
              className="border rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <div>
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1"
            />
          </div>
        </div>

        <div className="overflow-x-auto border rounded">
          {loading ? (
            <div className="p-6 text-center">Loading leave requests...</div>
          ) : fetchError ? (
            <div className="p-6 text-center text-red-600">{fetchError}</div>
          ) : filtered.length === 0 ? (
            <div className={`p-6 text-center ${isDark ? 'text-gray-300' : ''}`}>No leave applications found.</div>
          ) : (
            <table className={`min-w-full table-auto ${isDark ? 'bg-gray-800' : ''}`}>
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-3 py-2 text-left">Employee Id</th>
                  <th className="px-3 py-2 text-left">Employee Name</th>
                  <th className="px-3 py-2 text-left">Dates</th>
                  <th className="px-3 py-2 text-left">Reason</th>
                  <th className="px-3 py-2 text-left">Email</th>
                  <th className="px-3 py-2 text-left">Updated By</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((row) => (
                  <tr key={row.id} className="even:bg-gray-100">
                    <td className="px-3 py-2">{row.employeeId}</td>
                    <td className="px-3 py-2">{row.employeeName}</td>
                    <td className="px-3 py-2">{row.dates}</td>
                    <td className="px-3 py-2">{row.reason}</td>
                     <td className="px-3 py-2">{row.email}</td>
                    <td className="px-3 py-2">{row.updatedBy}</td>
                    <td className="px-3 py-2">
                      {row.status === "approved" ? (
                        <span className="bg-green-200 text-green-800 px-2 py-1 rounded">Approved</span>
                      ) : row.status === "rejected" ? (
                        <span className="bg-red-200 text-red-800 px-2 py-1 rounded">Rejected</span>
                      ) : (
                        <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Pending</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateStatus(row.id, 'approved')}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                          disabled={processing}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(row.id, 'rejected')}
                          className="bg-gray-500 text-white px-3 py-1 rounded"
                          disabled={processing}
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                          disabled={processing}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, filtered.length)} of {filtered.length} entries
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            <div className="px-2">{currentPage} / {totalPages}</div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLeave;

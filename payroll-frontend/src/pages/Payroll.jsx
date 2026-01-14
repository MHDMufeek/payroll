import { useState } from "react";
import TopNav from "../components/TopNav";

const samplePayroll = [
  { id: 1, name: "Pooja", payPeriod: "1st", netSalary: "40k" },
  { id: 2, name: "Kumar", payPeriod: "2nd", netSalary: "35k" },
  { id: 3, name: "Mohan", payPeriod: "3rd", netSalary: "35k" },
];

const Payroll = () => {
  const [rows] = useState(samplePayroll);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    employeeId: "",
    startDate: "",
    endDate: "",
    hra: "",
    bonus: "",
    deductions: "",
    overtime: "",
    extraOrders: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    const employee = rows.find((r) => String(r.id) === form.employeeId);
    // Minimal demo behavior — in a real app you'd call an API or open a PDF
    alert(
      `Generating slip for ${employee ? employee.name : "(none)"}\nPeriod: ${form.startDate} → ${form.endDate}`
    );
  };

  const filtered = rows.filter(
    (r) => r.name.toLowerCase().includes(query.toLowerCase()) || String(r.id).includes(query)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />

      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Payroll</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: payroll table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Employee Salary</h2>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="border border-gray-200 rounded px-3 py-2 text-sm w-48"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-600">
                    <th className="p-3">Employee</th>
                    <th className="p-3">Pay Periods</th>
                    <th className="p-3">Net Salary</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-800">{r.name}</td>
                      <td className="p-3 text-gray-600">{r.payPeriod}</td>
                      <td className="p-3 text-gray-800">{r.netSalary}</td>
                      <td className="p-3 text-gray-600 space-x-3">
                        <button className="text-xs text-gray-500 hover:text-gray-800">✏️</button>
                        <button className="text-xs text-blue-600 hover:underline">👁️ view</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Generate Salary Slip */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Generate Salary Slip</h2>
              <button className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded">Generate Slip</button>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="text-sm text-gray-700">Select employee</label>
                <select
                  name="employeeId"
                  value={form.employeeId}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 text-sm"
                >
                  <option value="">-- Select --</option>
                  {rows.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} (ID {r.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-700">Pay Period Start Date</label>
                  <input
                    name="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Pay Period End Date</label>
                  <input
                    name="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Manual Adjustments</label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <input
                    name="hra"
                    placeholder="HRA (Rs)"
                    value={form.hra}
                    onChange={handleChange}
                    className="border border-gray-200 rounded px-3 py-2 text-sm"
                  />
                  <input
                    name="bonus"
                    placeholder="Bonus (Rs)"
                    value={form.bonus}
                    onChange={handleChange}
                    className="border border-gray-200 rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Deductions (Rs)</label>
                <input
                  name="deductions"
                  placeholder="Deductions"
                  value={form.deductions}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Productivity metrics</label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <input
                    name="overtime"
                    placeholder="Overtime (Hours)"
                    value={form.overtime}
                    onChange={handleChange}
                    className="border border-gray-200 rounded px-3 py-2 text-sm"
                  />
                  <input
                    name="extraOrders"
                    placeholder="Extra orders processed"
                    value={form.extraOrders}
                    onChange={handleChange}
                    className="border border-gray-200 rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Generate Salary Slip
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;

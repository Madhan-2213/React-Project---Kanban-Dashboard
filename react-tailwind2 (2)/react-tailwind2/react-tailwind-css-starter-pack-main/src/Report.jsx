import React, { useMemo, useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";

function gatherTasks() {
  const all = JSON.parse(localStorage.getItem("tasks")) || {
    new: [],
    inProgress: [],
    review: [],
    completed: [],
  };
  // Flatten with status field
  const withStatus = [
    ...all.new.map((t) => ({ ...t, status: "new" })),
    ...all.inProgress.map((t) => ({ ...t, status: "inProgress" })),
    ...all.review.map((t) => ({ ...t, status: "review" })),
    ...all.completed.map((t) => ({ ...t, status: "completed" })),
  ];
  return { all, flat: withStatus };
}

function computeMetrics() {
  const { all, flat } = gatherTasks();
  const counts = {
    new: all.new.length,
    inProgress: all.inProgress.length,
    review: all.review.length,
    completed: all.completed.length,
  };
  const priorityCount = { low: 0, medium: 0, high: 0 };
  flat.forEach((t) => {
    if (t.priority && priorityCount[t.priority] !== undefined) {
      priorityCount[t.priority] += 1;
    }
  });
  return { counts, priorityCount, flat };
}

const COLORS = ["#22c55e", "#eab308", "#ef4444", "#3b82f6"]; // green, yellow, red, blue

export default function Report() {
  const containerRef = useRef(null);

  const { counts, priorityCount, flat } = useMemo(() => computeMetrics(), []);

  const statusData = useMemo(
    () => [
      { name: "New", value: counts.new },
      { name: "In Progress", value: counts.inProgress },
      { name: "Review", value: counts.review },
      { name: "Completed", value: counts.completed },
    ],
    [counts]
  );

  const priorityData = useMemo(
    () => [
      { name: "Low", value: priorityCount.low },
      { name: "Medium", value: priorityCount.medium },
      { name: "High", value: priorityCount.high },
    ],
    [priorityCount]
  );

  const completionByPriorityData = useMemo(() => {
    const comp = { low: 0, medium: 0, high: 0 };
    flat.forEach((t) => {
      if (t.status === "completed" && comp[t.priority] !== undefined) comp[t.priority] += 1;
    });
    return [
      { priority: "Low", completed: comp.low },
      { priority: "Medium", completed: comp.medium },
      { priority: "High", completed: comp.high },
    ];
  }, [flat]);

  const downloadPNG = async () => {
    if (!containerRef.current) return;
    const canvas = await html2canvas(containerRef.current);
    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = data;
    link.download = "zidio-report.png";
    link.click();
  };

  const downloadCSV = () => {
    const headers = ["Title", "Description", "Priority", "Status", "DateTime", "FileName"];
    const rows = flat.map((t) => [
      JSON.stringify(t.title || ""),
      JSON.stringify(t.description || ""),
      t.priority || "",
      t.status,
      t.dateTime || "",
      t.fileName || "",
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "zidio-report.csv";
    link.click();
  };

  return (
    <main className="min-h-screen bg-gray-50">
  <div className="max-w-7xl mx-auto p-6">

        <div className="flex items-center justify-between mt-6 mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Task Report</h1>
          <div className="flex gap-3">
            <button onClick={downloadPNG} className="px-3 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700">Download PNG</button>
            <button onClick={downloadCSV} className="px-3 py-2 text-sm rounded bg-emerald-600 text-white hover:bg-emerald-700">Download CSV</button>
          </div>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status pie chart */}
          <div className="bg-white rounded-lg border p-4">
            <h2 className="font-semibold mb-2">Tasks by Status</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={4}>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Priority pie chart */}
          <div className="bg-white rounded-lg border p-4">
            <h2 className="font-semibold mb-2">Tasks by Priority</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={priorityData} dataKey="value" nameKey="name" outerRadius={100}>
                  {priorityData.map((entry, index) => (
                    <Cell key={`cellp-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Completions by priority bar chart */}
          <div className="bg-white rounded-lg border p-4 md:col-span-2">
            <h2 className="font-semibold mb-2">Completions by Priority</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={completionByPriorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priority" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#22c55e" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}

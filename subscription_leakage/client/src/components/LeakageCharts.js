import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#d02bb5", "#fdea18"];

const LeakageCharts = ({ report, totalLeakage }) => {
  if (!report || report.length === 0) {
    return <h3>No data available for charts</h3>;
  }

  const safeAmount = report
    .filter((r) => !r.status.includes("Leakage"))
    .reduce((sum, r) => sum + r.monthlyCost, 0);

  const pieData = [
    { name: "Leakage", value: totalLeakage || 1 },
    { name: "Safe Spend", value: safeAmount || 1 },
  ];

  return (
    <div style={{ marginTop: "40px", width: "100%" }}>
      <h2>📊 Financial Overview</h2>

      {/* PIE CHART */}
      <div style={{ width: "100%", height: 500 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={200}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div style={{ width: "100%", height: 300, marginTop: 40 }}>
        <ResponsiveContainer>
          <BarChart data={report}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="monthlyCost" fill="#1890ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeakageCharts;

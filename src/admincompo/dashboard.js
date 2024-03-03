import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './dashboard.css'; // Import your CSS file

const data = [
  { name: 'Monday', Sales: 4000 },
  { name: 'Tuesday', Sales: 3000 },
  { name: 'Wednesday', Sales: 2000 },
  { name: 'Thursday', Sales: 2780 },
  { name: 'Friday', Sales: 1890 },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} animationDuration={1000}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" label={{ value: 'Day', position: 'insideBottom', offset: -10 }} tick={{ fontSize: 12 }} />
            <YAxis label={{ value: 'Sales', angle: -90, position: 'insideLeft', offset: 10 }} tick={{ fontSize: 12 }} />
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip formatter={(value, name, props) => [value, `${name}: ${props.payload[name]}`]} />
            <Legend />
            {/* Use the linearGradient as the stroke */}
            <Line type="monotone" dataKey="Sales" stroke="url(#salesGradient)" strokeWidth={2} dot={{ stroke: '#82ca9d', strokeWidth: 2, r: 4 }} animationDuration={1500} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;

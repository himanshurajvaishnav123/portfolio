import React from 'react';
import Sidebar from '../components/common/Sidebar';
import DashboardCards from '../components/admin/DashboardCards';
import { useStudents } from '../context/StudentContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const { students, calculateAttendancePercentage } = useStudents();

  // Chart Data 1: Attendance Distribution
  const chartData = students.map(s => ({
    name: s.name,
    Attendance: calculateAttendancePercentage(s.attendance)
  }));

  // Chart Data 2: Course breakdown
  const bcaCount = students.filter(s => s.course === 'BCA').length;
  const otherCount = students.length - bcaCount;
  const pieData = [
    { name: 'BCA Stream', value: bcaCount },
    { name: 'Other Streams', value: otherCount || 0 }
  ];
  const COLORS = ['#06b6d4', '#3b82f6'];

  return (
    <div className="flex bg-slate-950 min-h-screen text-slate-100">
      <Sidebar isAdmin={true} />
      <div className="flex-1 p-8 overflow-y-auto max-w-7xl space-y-8">
        <header>
          <h1 className="text-3xl font-bold font-mono tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            System Intelligence Hub
          </h1>
          <p className="text-slate-400 text-xs mt-1">Real-time frontend analytics modules active.</p>
        </header>

        <DashboardCards students={students} calcAttendance={calculateAttendancePercentage} />

        {/* Advanced Feature: Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-xl backdrop-blur-md">
            <h3 className="text-sm font-mono uppercase text-cyan-400 mb-4 tracking-wider">Individual Attendance Metrics (%)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }} />
                  <Bar dataKey="Attendance" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-xl backdrop-blur-md flex flex-col justify-between">
            <h3 className="text-sm font-mono uppercase text-slate-400 mb-4 tracking-wider">Academic Distribution</h3>
            <div className="h-48 w-full flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 text-xs font-mono mt-2">
              <span className="text-cyan-400">● BCA Stream ({bcaCount})</span>
              <span className="text-blue-500">● Others ({otherCount})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
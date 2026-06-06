import React from 'react';

const DashboardCards = ({ students, calcAttendance }) => {
  const totalStudents = students.length;
  
  const overallAvgAttendance = Math.round(
    students.reduce((acc, curr) => acc + calcAttendance(curr.attendance), 0) / (totalStudents || 1)
  );

  const lowAttendanceCount = students.filter(s => calcAttendance(s.attendance) < 75).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-cyan-500/10 shadow-lg">
        <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Total Students</p>
        <p className="text-4xl font-mono font-bold text-cyan-400 mt-2">{totalStudents}</p>
      </div>
      <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-cyan-500/10 shadow-lg">
        <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Average Attendance</p>
        <p className="text-4xl font-mono font-bold text-emerald-400 mt-2">{overallAvgAttendance}%</p>
      </div>
      <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-cyan-500/10 shadow-lg">
        <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">At Risk (&lt;75%)</p>
        <p className="text-4xl font-mono font-bold text-rose-400 mt-2">{lowAttendanceCount}</p>
      </div>
    </div>
  );
};

export default DashboardCards;
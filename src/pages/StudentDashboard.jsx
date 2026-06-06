import React from 'react';
import Sidebar from '../components/common/Sidebar';
import { useStudents } from '../context/StudentContext';

const StudentDashboard = () => {
  const { currentStudent, calculateAttendancePercentage } = useStudents();

  if (!currentStudent) return <div className="p-8 text-center text-slate-400 font-mono">Session expired. Please log in again.</div>;

  const attendancePct = calculateAttendancePercentage(currentStudent.attendance);

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar isAdmin={false} />
      <div className="flex-1 p-8 max-w-5xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold font-mono text-slate-100">Welcome back, {currentStudent.name}</h1>
          <p className="text-xs text-slate-400">Student Identity Tracker Hub</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Academic Status</p>
            <p className="text-xl font-bold text-cyan-400 mt-2">{currentStudent.course}</p>
            <p className="text-xs text-slate-500 mt-0.5">{currentStudent.semester} Semester</p>
          </div>
          <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Your Attendance Metric</p>
            <p className={`text-3xl font-bold font-mono mt-2 ${attendancePct >= 75 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {attendancePct}%
            </p>
          </div>
          <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Unique Matrix ID</p>
            <p className="text-xl font-bold font-mono text-slate-300 mt-2">{currentStudent.id}</p>
          </div>
        </div>

        {/* System Broadcast/Notifications Feed */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4">📢 System Advisories & Feed Notifications</h3>
          <div className="space-y-3">
            {currentStudent.notifications && currentStudent.notifications.length > 0 ? (
              currentStudent.notifications.map((note, index) => (
                <div key={index} className="p-3 bg-slate-950 border border-slate-900 rounded-lg text-xs text-slate-300 font-sans leading-relaxed">
                  {note}
                </div>
              ))
            ) : (
              <p className="text-xs font-mono text-slate-600">No active tracking notifications found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
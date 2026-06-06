import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [role, setRole] = useState('admin'); // 'admin' or 'student'
  const [error, setError] = useState('');

  const navigate = useNavigate();
  // Fixed: Added isAdminLoggedIn and setIsAdminLoggedIn destructured from useStudents Context
  const { students, setCurrentStudent, setIsAdminLoggedIn } = useStudents();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (role === 'admin') {
      if (username === 'admin' && password === 'admin123') {
        // Fix: Set auth states true before initiating browser navigation
        setIsAdminLoggedIn(true);
        localStorage.setItem('sms_admin_logged', 'true');
        navigate('/admin-dashboard');
      } else {
        setError('Invalid admin credentials. (Hint: admin / admin123)');
      }
    } else {
      const student = students.find(s => s.id.toLowerCase() === studentId.trim().toLowerCase());
      if (student) {
        setCurrentStudent(student);
        localStorage.setItem('sms_current_student', JSON.stringify(student));
        navigate('/student-dashboard');
      } else {
        setError('Student ID not found. (Try standard seed: STU001)');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background styling elements matching your tech theme */}
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute top-20 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22d3ee_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee_1px,transparent_1px)] bg-[size:45px_45px]"></div>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-2xl relative z-10 animate-fadeIn shadow-[0_0_30px_rgba(34,211,238,0.12)] hover:shadow-[0_0_45px_rgba(34,211,238,0.2)] transition-all duration-500">
        <button
          onClick={() => navigate('/' )}
          className="text-xs text-cyan-400 hover:underline mb-4 inline-block font-mono"
        >
          &larr; Back to Portfolio Homepage
        </button>

        <h2 className="text-2xl font-bold text-slate-100 font-mono tracking-wide text-center animate-softFloat">SMS Gate Portal</h2>
        <p className="text-slate-400 text-sm text-center mb-6">Manage records or track metrics</p>

        <div className="flex gap-2 p-1 bg-slate-950 rounded-lg mb-6 border border-slate-800">
          <button
            type="button"
            onClick={() => { setRole('admin'); setError(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300 ${role === 'admin'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-[0_0_20px_rgba(34,211,238,0.35)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
          >
            Administrator
          </button>
          <button
            type="button"
            onClick={() => { setRole('student'); setError(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300 ${role === 'student' 
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-[0_0_20px_rgba(34,211,238,0.35)]' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
          >
            Student Member
          </button>
        </div>

        {error && <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-lg mb-4 text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          {role === 'admin' ? (
            <>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none transition-all duration-300 focus:shadow-[0_0_18px_rgba(34,211,238,0.25)] hover:border-cyan-500/30" placeholder="Enter 'admin'" required />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none transition-all duration-300 focus:shadow-[0_0_18px_rgba(34,211,238,0.25)] hover:border-cyan-500/30" placeholder="Enter 'admin123'" required />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Student Identification Code</label>
              <input type="text" value={studentId} onChange={e => setStudentId(e.target.value)} className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none transition-all duration-300 focus:shadow-[0_0_18px_rgba(34,211,238,0.25)]" placeholder="e.g., STU001" required />
            </div>
          )}
          <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-lg mt-2 font-mono transition-all duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)]">
            AUTHENTICATE SYSTEM
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
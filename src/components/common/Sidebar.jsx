import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adminLinks = [
    { name: 'Dashboard', path: '/admin-dashboard' },
    { name: 'Student List', path: '/student-list' },
    { name: 'Add Student', path: '/add-student' },
  ];

  const handleLogout = () => {
    if (!isAdmin) localStorage.removeItem('sms_current_student');
    navigate('/');
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-cyan-500/20 h-screen p-6 flex flex-col justify-between text-slate-100">
      <div>
        <h2 className="text-xl font-bold text-cyan-400 mb-8 tracking-wider font-mono">⚡ SMS PORTAL</h2>
        <nav className="space-y-2">
          {isAdmin ? adminLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === link.path 
                  ? 'bg-cyan-500/10 text-cyan-400 border-l-4 border-cyan-400' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {link.name}
            </button>
          )) : (
            <button className="w-full text-left px-4 py-3 bg-cyan-500/10 text-cyan-400 border-l-4 border-cyan-400 rounded-lg">
              My Profile
            </button>
          )}
        </nav>
      </div>
      <button 
        onClick={handleLogout}
        className="w-full bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-400 py-2 rounded-lg font-medium transition-all duration-300 border border-slate-700 hover:border-red-500/30"
      >
        Exit System
      </button>
    </div>
  );
};

export default Sidebar;
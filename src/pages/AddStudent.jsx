import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import { useStudents } from '../context/StudentContext';

const AddStudent = () => {
  const { addStudent } = useStudents();
  const [formData, setFormData] = useState({ name: '', email: '', course: 'BCA', semester: '1st' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(formData);
    setSuccess(true);
    setFormData({ name: '', email: '', course: 'BCA', semester: '1st' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar isAdmin={true} />
      <div className="flex-1 p-8 max-w-2xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold font-mono text-slate-100">Enrol New Student</h1>
          <p className="text-slate-400 text-xs">Register new academic membership profiles</p>
        </header>

        {success && <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-4 rounded-xl mb-4">Student profile created dynamically in context database!</div>}

        <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl space-y-4">
          <div>
            <label className="block text-xs uppercase font-mono text-slate-400 mb-1">Full Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/40 rounded-lg p-2.5 text-slate-200 focus:outline-none text-sm" required />
          </div>
          <div>
            <label className="block text-xs uppercase font-mono text-slate-400 mb-1">Email Address</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/40 rounded-lg p-2.5 text-slate-200 focus:outline-none text-sm" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-mono text-slate-400 mb-1">Degree Stream</label>
              <input type="text" value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/40 rounded-lg p-2.5 text-slate-200 focus:outline-none text-sm" required />
            </div>
            <div>
              <label className="block text-xs uppercase font-mono text-slate-400 mb-1">Current Semester</label>
              <select value={formData.semester} onChange={e => setFormData({...formData, semester: e.target.value})} className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/40 rounded-lg p-2.5 text-slate-200 focus:outline-none text-sm">
                <option value="1st">1st Sem</option>
                <option value="2nd">2nd Sem</option>
                <option value="3rd">3rd Sem</option>
                <option value="4th">4th Sem</option>
                <option value="5th">5th Sem</option>
                <option value="6th">6th Sem</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-600 transition-colors text-slate-950 font-bold text-sm rounded-lg font-mono tracking-wide">
            REGISTER PROFILE
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
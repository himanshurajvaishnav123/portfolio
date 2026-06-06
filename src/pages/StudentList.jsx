import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import AttendanceModal from '../components/admin/AttendanceModal';
import { useStudents } from '../context/StudentContext';
import { jsPDF } from 'jspdf';

const StudentList = () => {
  const { students, updateStudent, deleteStudent, markAttendance, calculateAttendancePercentage } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [activeAttendanceStudent, setActiveAttendanceStudent] = useState(null);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', course: '', semester: '' });

  const startInlineEdit = (student) => {
    setEditingStudentId(student.id);
    setEditFormData({ name: student.name, email: student.email, course: student.course, semester: student.semester });
  };

  const handleInlineSave = (id) => {
    const historicalData = students.find(s => s.id === id);
    updateStudent({ ...historicalData, ...editFormData });
    setEditingStudentId(null);
  };

  const exportToPDF = (student) => {
    const doc = new jsPDF();
    const attendancePct = calculateAttendancePercentage(student.attendance);

    // PDF Text Layout Styling
    doc.setFont("courier", "bold");
    doc.text("STUDENT MANAGEMENT SYSTEM REPORT", 14, 20);
    doc.line(14, 23, 195, 23);

    doc.setFont("helvetica", "normal");
    doc.text(`Student UID: ${student.id}`, 14, 35);
    doc.text(`Full Name:   ${student.name}`, 14, 45);
    doc.text(`Email ID:    ${student.email}`, 14, 55);
    doc.text(`Academic:    ${student.course} - ${student.semester} Semester`, 14, 65);
    doc.text(`Attendance:  ${attendancePct}%`, 14, 75);

    doc.line(14, 82, 195, 82);
    doc.text(`Report Generated On: ${new Date().toLocaleDateString()}`, 14, 92);

    // Save dynamic file
    doc.save(`Report_${student.id}.pdf`);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = semesterFilter === 'All' || student.semester === semesterFilter;
    return matchesSearch && matchesSemester;
  });

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar isAdmin={true} />
      <div className="flex-1 p-8 overflow-x-auto max-w-7xl">
        <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-mono text-slate-100">Student Directory</h1>
            <p className="text-slate-400 text-xs">Search, modify, or log student analytics metrics.</p>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search ID or Name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
            />
            <select
              value={semesterFilter}
              onChange={e => setSemesterFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="All">All Semesters</option>
              <option value="4th">4th Semester</option>
              <option value="6th">6th Semester</option>
            </select>
          </div>
        </header>

        <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 font-mono text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4">UID</th>
                <th className="p-4">Personal Info</th>
                <th className="p-4">Academic Program</th>
                <th className="p-4">Attendance</th>
                <th className="p-4 text-right">Actions Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
              {filteredStudents.map(student => {
                const isEditing = editingStudentId === student.id;
                const attendancePct = calculateAttendancePercentage(student.attendance);
                return (
                  <tr key={student.id} className="hover:bg-slate-900/20 transition-colors">
                    <td className="p-4 font-mono text-xs text-cyan-400 font-bold">{student.id}</td>
                    <td className="p-4">
                      {isEditing ? (
                        <div className="space-y-1.5">
                          <input type="text" value={editFormData.name} onChange={e => setEditFormData({ ...editFormData, name: e.target.value })} className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white block w-full" />
                          <input type="email" value={editFormData.email} onChange={e => setEditFormData({ ...editFormData, email: e.target.value })} className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white block w-full" />
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium text-slate-200">{student.name}</p>
                          <p className="text-xs text-slate-500">{student.email}</p>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {isEditing ? (
                        <div className="space-y-1.5">
                          <input type="text" value={editFormData.course} onChange={e => setEditFormData({ ...editFormData, course: e.target.value })} className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white block w-full" />
                          <input type="text" value={editFormData.semester} onChange={e => setEditFormData({ ...editFormData, semester: e.target.value })} className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white block w-full" />
                        </div>
                      ) : (
                        <p className="text-xs font-mono">{student.course} <span className="text-slate-500">({student.semester} Sem)</span></p>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold ${attendancePct >= 75 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {attendancePct}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right space-x-1.5">
                      {isEditing ? (
                        <>
                          <button onClick={() => handleInlineSave(student.id)} className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded hover:bg-emerald-500/20">Save</button>
                          <button onClick={() => setEditingStudentId(null)} className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded hover:bg-slate-700">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => exportToPDF(student)}
                            className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded hover:bg-emerald-500/20"
                          >
                            ⚙ PDF
                          </button>
                          <button onClick={() => startInlineEdit(student)} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded hover:bg-slate-700">Edit</button>
                          <button onClick={() => deleteStudent(student.id)} className="text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-1 rounded hover:bg-rose-500/20">Del</button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-slate-500 text-xs tracking-wider uppercase font-mono">No student records match filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {activeAttendanceStudent && (
          <AttendanceModal
            student={activeAttendanceStudent}
            onClose={() => setActiveAttendanceStudent(null)}
            onSave={markAttendance}
          />
        )}
      </div>
    </div>
  );
};

export default StudentList;
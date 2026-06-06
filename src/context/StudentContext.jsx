import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialStudents } from '../data/initialStudents';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const localData = localStorage.getItem('sms_students');
    return localData ? JSON.parse(localData) : initialStudents.map(s => ({
      ...s,
      // Default grades added for analytics
      grades: { DSA: 85, MERN: 92, Python: 78 }
    }));
  });

  const [currentStudent, setCurrentStudent] = useState(() => {
    const loggedIn = localStorage.getItem('sms_current_student');
    return loggedIn ? JSON.parse(loggedIn) : null;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('sms_admin_logged') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sms_students', JSON.stringify(students));
  }, [students]);

  const calculateAttendancePercentage = (attendanceArray) => {
    if (!attendanceArray || attendanceArray.length === 0) return 100;
    const present = attendanceArray.filter(a => a.status === 'Present').length;
    return Math.round((present / attendanceArray.length) * 100);
  };

  const addStudent = (student) => {
    setStudents(prev => [...prev, { 
      ...student, 
      id: `STU${Date.now().toString().slice(-3)}`, 
      attendance: [], 
      notifications: ['Welcome to the portal!'],
      grades: { DSA: Math.floor(Math.random() * 40) + 60, MERN: Math.floor(Math.random() * 40) + 60, Python: Math.floor(Math.random() * 40) + 60 }
    }]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    if (currentStudent && currentStudent.id === updatedStudent.id) {
      setCurrentStudent(updatedStudent);
      localStorage.setItem('sms_current_student', JSON.stringify(updatedStudent));
    }
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const markAttendance = (id, date, status) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const existingIndex = s.attendance.findIndex(a => a.date === date);
        let updatedAttendance = [...s.attendance];
        if (existingIndex > -1) updatedAttendance[existingIndex].status = status;
        else updatedAttendance.push({ date, status });
        return { ...s, attendance: updatedAttendance };
      }
      return s;
    }));
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    setCurrentStudent(null);
    localStorage.removeItem('sms_admin_logged');
    localStorage.removeItem('sms_current_student');
  };

  return (
    <StudentContext.Provider value={{
      students, currentStudent, setCurrentStudent, isAdminLoggedIn, setIsAdminLoggedIn,
      addStudent, updateStudent, deleteStudent, markAttendance, calculateAttendancePercentage, logout
    }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => useContext(StudentContext);
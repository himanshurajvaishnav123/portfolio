import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <StudentProvider>
      <Router>
        {/* AppRoutes handles all your portfolio sections and management system views cleanly */}
        <AppRoutes />
      </Router>
    </StudentProvider>
  );
}

export default App;
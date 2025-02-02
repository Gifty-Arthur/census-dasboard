import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Enumerator from './components/Enumerator';
import Dasboard from './components/Dasboard';
import Supervisors from './components/Supervisors';
import Households from './components/Households';
import Backup from './components/Backup';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dasboard />} />
          <Route path="/dasboard" element={<Dasboard />} />
          <Route path="/manage-records" element={<Enumerator />} />
          <Route path="/supervisors" element={<Supervisors />} />
          <Route path="/households" element={<Households />} />
          <Route path="/backup" element={<Backup />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;

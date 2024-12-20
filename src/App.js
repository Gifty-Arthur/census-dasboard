import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Enumerator from './components/Enumerator';
import Dasboard from './components/Dasboard';
import Supervisors from './components/Supervisors';
import Roster from './components/Roster';
import Households from './components/Households';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/dasboard" element={<Dasboard />} />
          <Route path="/manage-records" element={<Enumerator />} />
          <Route path="/supervisors" element={<Supervisors />} />
          <Route path="/households" element={<Households />} />
          <Route path="/roster" element={<Roster />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Enumerator from './components/Enumerator';
import Dasboard from './components/Dasboard';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/dasboard" element={<Dasboard />} />
          <Route path="/manage-records" element={<Enumerator />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;

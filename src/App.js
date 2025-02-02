import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Enumerator from './components/Enumerator';
import Dashboard from './components/Dashboard'; // Corrected import
import Supervisors from './components/Supervisors';
import Households from './components/Households';
import Backup from './components/Backup';
import Login from './components/Login';
import { AuthProvider, AuthContext } from './AuthContext';

const PrivateRoute = ({ element }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  
  console.log('Auth status:', { isLoggedIn, isLoading }); // Add this

  if (isLoading) return <div>Loading auth status...</div>;
  
  console.log('Redirecting?', !isLoggedIn); // Add this
  
  return isLoggedIn ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="enumerators" element={<PrivateRoute element={<Enumerator />} />} />
            <Route path="supervisors" element={<PrivateRoute element={<Supervisors />} />} />
            <Route path="households" element={<PrivateRoute element={<Households />} />} />
            <Route path="backup" element={<PrivateRoute element={<Backup />} />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
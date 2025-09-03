import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, UserContext } from './context/UserContext';
import LoginPage from './pages/Auth/LoginPage';
import SignUpPage from './pages/Auth/SignUpPage';
import MedicationEntry from './pages/Auth/MedicationEntry';
import Dashboard from './pages/Dashboard/Dashboard';
import MedicineWeekPage from './pages/Dashboard/MedicineWeekPage';
import AppointmentsPage from './pages/Dashboard/AppointmentsPage';
import MedicinePricePanel from './components/MedicinePricePanel'; // correct relative path import
function RequireAuth({ children }) {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/" replace />;
}
export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/medications" element={<RequireAuth><MedicationEntry /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/dashboard/medicines" element={<RequireAuth><MedicineWeekPage /></RequireAuth>} />
          <Route path="/dashboard/appointments" element={<RequireAuth><AppointmentsPage /></RequireAuth>} />
          
        </Routes>
      </Router>
    </UserProvider>
  );
}
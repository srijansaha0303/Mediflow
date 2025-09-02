import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { UserProvider, UserContext } from './context/UserContext';
import LoginPage from './pages/Auth/LoginPage';
import SignUpPage from './pages/Auth/SignUpPage';
import MedicationEntry from './pages/Auth/MedicationEntry';
import Dashboard from './pages/Dashboard/Dashboard';

function RequireAuth({ children }) {
  const { user } = React.useContext(UserContext);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/medications"
            element={
              <RequireAuth>
                <MedicationEntry />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}
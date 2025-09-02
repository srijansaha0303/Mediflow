import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [medications, setMedications] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [history, setHistory] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [queuePosition, setQueuePosition] = useState(0);
  
  return (
    <UserContext.Provider value={{
      user, setUser,
      medications, setMedications,
      appointments, setAppointments,
      emergencyContact, setEmergencyContact,
      history, setHistory,
      doctors, setDoctors,
      queuePosition, setQueuePosition,
    }}>
      {children}
    </UserContext.Provider>
  );
}
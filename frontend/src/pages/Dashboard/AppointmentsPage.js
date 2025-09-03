import React, { useContext, useState } from 'react';
import AppointmentForm from '../../components/AppointmentForm';
import AppointmentList from '../../components/AppointmentList';
import { UserContext } from '../../context/UserContext';

export default function AppointmentsPage() {
  const { appointments, setAppointments } = useContext(UserContext);
  const [localAppointments, setLocalAppointments] = useState(appointments || []);

  function addAppointment(appt) {
    const updated = [...localAppointments, appt];
    setLocalAppointments(updated);
    setAppointments(updated);
  }

  return (
    <div>
      <AppointmentForm addAppointment={addAppointment} />
      <AppointmentList appointments={localAppointments} />
    </div>
  );
}
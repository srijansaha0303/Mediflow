import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1.5rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 3px 15px rgba(0,0,0,0.2);
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const AppointmentItem = styled.div`
  margin-bottom: 1rem;
  font-weight: 600;
`;

export default function AppointmentPanel({ appointments }) {
  const today = new Date();

  function daysFromNow(dateStr) {
    const apsDate = new Date(dateStr);
    const diffTime = apsDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return (
    <Container>
      <Title>Appointments of the Week</Title>
      {appointments && appointments.length > 0 ? (
        appointments.map((app, idx) => (
          <AppointmentItem key={idx}>
            {new Date(app.date).toLocaleDateString()} - {app.reason} with {app.doctor} (in {daysFromNow(app.date)} days)
          </AppointmentItem>
        ))
      ) : <p>No appointments scheduled.</p>}
    </Container>
  );
}
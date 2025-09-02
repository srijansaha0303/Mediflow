import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: url('/assets/bg-dashboard.jpg') no-repeat center center/cover;
  padding: 3rem 2rem;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 2rem;
  text-shadow: 0 2px 6px #000;
`;

const PanelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
  gap: 1.5rem;
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 1.5rem 2rem;
  box-shadow: 0 5px 20px rgb(0 0 0 / 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 7px 30px rgb(0 0 0 / 0.5);
  }
`;

const PanelTitle = styled.h2`
  margin-bottom: 1rem;
  font-weight: 700;
`;

export default function Dashboard() {
  const { user, medications, appointments, emergencyContact, history, doctors, queuePosition } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Welcome, {user.name}!</Title>
      <PanelGrid>

        {/* Medicines Panel */}
        <Panel onClick={() => navigate('/dashboard/medicines')}>
          <PanelTitle>Medicines of the Week</PanelTitle>
          {medications.length > 0 ? (
            <ul>
              {medications.map((med, idx) => (
                <li key={idx}>{med.name} - {med.time} - {med.dose} mg</li>
              ))}
            </ul>
          ) : <p>No medications entered yet.</p>}
        </Panel>

        {/* Appointments Panel */}
        <Panel onClick={() => alert('Appointment detail page coming soon')}>
          <PanelTitle>Appointment of the Week</PanelTitle>
          {appointments.length > 0 ? (
            <ul>
              {appointments.map((app, idx) => (
                <li key={idx}>{new Date(app.date).toLocaleDateString()} - {app.reason} with {app.doctor} ({app.distance} away)</li>
              ))}
            </ul>
          ) : <p>No appointments scheduled.</p>}
        </Panel>

        {/* Emergency assistant panel */}
        <Panel onClick={() => {
            if (emergencyContact) {
              alert(`Sending emergency message to ${emergencyContact}`);
              // Integrate your emergencyService.sendMessage here
            } else {
              alert('Please set up your emergency contact.');
            }
          }}>
          <PanelTitle>Emergency Assistant</PanelTitle>
          <p>Click to send emergency message.</p>
        </Panel>

        {/* History/Timeline */}
        <Panel onClick={() => alert('History panel coming soon')}>
          <PanelTitle>History / Timeline</PanelTitle>
          {history.length > 0 ? (
            <ul>
              {history.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          ) : <p>No discomfort history available.</p>}
          <button onClick={() => alert('Add history functionality coming soon')}>Update History</button>
        </Panel>

        {/* Doctor profile / Reviews */}
        <Panel onClick={() => alert('Doctor profiles page coming soon')}>
          <PanelTitle>Doctor Profiles / Reviews</PanelTitle>
          {doctors.length > 0 ? (
            <ul>
              {doctors.map((doc, idx) => (
                <li key={idx}>{doc.name} ({doc.specialty})</li>
              ))}
            </ul>
          ) : <p>Loading doctors...</p>}
        </Panel>

        {/* Symptom checker chatbot */}
        <Panel onClick={() => alert('Symptom Checker Chatbot coming soon')}>
          <PanelTitle>Symptom Checker Chatbot</PanelTitle>
          <p>Talk to get medication suggestions.</p>
        </Panel>

        {/* Smart Clinic Queue */}
        <Panel>
          <PanelTitle>Clinic Queue Position</PanelTitle>
          <p>Your queue position: {queuePosition || 'N/A'}</p>
        </Panel>

      </PanelGrid>
    </Container>
  );
}
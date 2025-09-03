import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import GenericMedicinePanel from '../../components/GenericMedicinePanel';
import HistoryTimeline from '../../components/HistoryTimeline'; // import your new component

const Container = styled.div`
  min-height: 100vh;
  /* Blue diagonal gradient from dark to lighter blue */
  background: linear-gradient(135deg, #2174b4ff, #04364eff);
  padding: 3rem 2rem;
  font-family: 'Poppins', sans-serif;
  color: white; /* Updated to white for contrast on dark background */
`;

const Title = styled.h1`
  color: #a8a1a1ff;
  margin-bottom: 2rem;
  text-shadow: 0 2px 6px #711010ff;
`;

const PanelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Panel = styled.div`
  background: rgba(69, 2, 146, 0.95);
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
  color: #142f43; /* Dark text for panel titles */
`;

export default function Dashboard() {
  const {
    user,
    medications,
    appointments,
    emergencyContact,
    history,
    doctors,
    queuePosition,
  } = useContext(UserContext);

  const [medicineName, setMedicineName] = useState('');
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Welcome, {user ? user.name : 'User'}!</Title>
      <PanelGrid>
        {/* Medicines Panel */}
        <Panel onClick={() => navigate('/dashboard/medicines')}>
          <PanelTitle>Medicines of the Week</PanelTitle>
          {medications.length > 0 ? (
            <ul>
              {medications.slice(0, 5).map((med, idx) => (
                <li key={idx}>
                  {med.name} - {med.time} - {med.dose} mg
                </li>
              ))}
              {medications.length > 5 && <li>...and more</li>}
            </ul>
          ) : (
            <p>No medications entered yet.</p>
          )}
        </Panel>

        {/* Appointments Panel */}
        <Panel onClick={() => navigate('/dashboard/appointments')}>
          <PanelTitle>Your Appointments</PanelTitle>
          {appointments.length > 0 ? (
            <p>You have {appointments.length} upcoming appointment(s)</p>
          ) : (
            <p>No appointments scheduled yet</p>
          )}
        </Panel>

        {/* Emergency Assistant Panel */}
        <Panel
          onClick={() => {
            if (emergencyContact) {
              alert(`Sending emergency message to ${emergencyContact}`);
            } else {
              alert('Please set up your emergency contact.');
            }
          }}
        >
          <PanelTitle>Emergency Assistant</PanelTitle>
          <p>Click to send emergency message.</p>
        </Panel>

        {/* History / Timeline Panel replaced with HistoryTimeline component */}
        <Panel>
          <PanelTitle>History / Timeline</PanelTitle>
          <HistoryTimeline />
        </Panel>

        {/* Doctor Profiles / Reviews Panel */}
        <Panel onClick={() => alert('Doctor profiles page coming soon')}>
          <PanelTitle>Doctor Profiles / Reviews</PanelTitle>
          {doctors.length > 0 ? (
            <ul>
              {doctors.map((doc, idx) => (
                <li key={idx}>
                  {doc.name} ({doc.specialty})
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading doctors...</p>
          )}
        </Panel>

        {/* Symptom Checker Chatbot Panel */}
        <Panel onClick={() => alert('Symptom Checker Chatbot coming soon')}>
          <PanelTitle>Symptom Checker Chatbot</PanelTitle>
          <p>Talk to get medication suggestions.</p>
        </Panel>

        {/* Clinic Queue Position Panel */}
        <Panel>
          <PanelTitle>Clinic Queue Position</PanelTitle>
          <p>Your queue position: {queuePosition || 'N/A'}</p>
        </Panel>

        {/* Generic Medicine Price Comparison Panel */}
        <Panel>
          <PanelTitle>Generic Medicine Price Comparison</PanelTitle>
          <input
            type="text"
            placeholder="Enter medicine name"
            value={medicineName}
            onChange={e => setMedicineName(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              borderRadius: 6,
              border: '1.5px solid #ccc',
            }}
          />
          <GenericMedicinePanel medicineName={medicineName} />
        </Panel>
      </PanelGrid>
    </Container>
  );
}

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';

const Container = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 3px 15px rgba(0,0,0,0.2);
  max-width: 400px;
  margin: 1rem auto;
  text-align: center;
`;

const Button = styled.button`
  background-color: #e53e3e;
  color: white;
  padding: 10px 1.5rem;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #c53030;
  }
`;

export default function EmergencyAssistant() {
  const { emergencyContact } = useContext(UserContext);
  const [msgSent, setMsgSent] = useState(false);

  function sendEmergency() {
    if (!emergencyContact) {
      alert('No emergency contact set!');
      return;
    }
    // Placeholder for actual messaging integration
    setMsgSent(true);
  }

  return (
    <Container>
      <h2>Emergency Assistant</h2>
      <p>Emergency Contact: <strong>{emergencyContact || 'Not set'}</strong></p>
      <Button onClick={sendEmergency}>Send Emergency Message</Button>
      {msgSent && <p style={{color:'green', marginTop:'10px'}}>Emergency message sent!</p>}
    </Container>
  );
}
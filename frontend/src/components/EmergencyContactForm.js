import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 8px;
  width: 70%;
  margin-right: 8px;
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: #2677b5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export default function EmergencyContactForm() {
  const { emergencyContact, setEmergencyContact } = useContext(UserContext);
  const [input, setInput] = useState(emergencyContact || '');

  const handleSave = () => {
    if (input.trim() === '') {
      alert('Please enter a valid contact.');
      return;
    }
    setEmergencyContact(input.trim());
    alert('Emergency contact saved!');
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="Enter emergency contact"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <Button onClick={handleSave}>Save</Button>
    </Container>
  );
}

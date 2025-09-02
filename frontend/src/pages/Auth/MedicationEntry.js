import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: url('/assets/bg-medications.jpg') no-repeat center center/cover;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 5rem 1rem;
`;

const Box = styled.div`
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
`;

const MedicationRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1.5px solid #ccc;
  &:focus {
    border-color: #764ba2;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #764ba2;
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 15px;
`;

export default function MedicationEntry() {
  const { user, setMedications } = useContext(UserContext);
  const [meds, setMeds] = useState([{ name:'', time:'', dose:'' }]);
  const navigate = useNavigate();

  function handleChange(index, field, value) {
    const newMeds = [...meds];
    newMeds[index][field] = value;
    setMeds(newMeds);
  }

  function addMedication() {
    setMeds([...meds, { name: '', time: '', dose: '' }]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMedications(meds);
    // Also optionally update in localStorage
    const updatedUser = { ...user, medications: meds };
    localStorage.setItem(user.email, JSON.stringify(updatedUser));
    alert('Medications saved!');
    navigate('/dashboard');
  }

  return (
    <Container>
      <Box>
        <h2>Enter Your Daily Medications</h2>
        <form onSubmit={handleSubmit}>
          {meds.map((med, idx) => (
            <MedicationRow key={idx}>
              <Input 
                placeholder="Medicine Name" 
                value={med.name} 
                onChange={e => handleChange(idx, 'name', e.target.value)} 
                required
              />
              <Input 
                type="time" 
                value={med.time} 
                onChange={e => handleChange(idx, 'time', e.target.value)} 
                required
              />
              <Input 
                placeholder="Dose (mg)" 
                value={med.dose} 
                onChange={e => handleChange(idx, 'dose', e.target.value)} 
                required
              />
            </MedicationRow>
          ))}
          <Button type="button" onClick={addMedication}>Add Medication</Button>
          <Button type="submit">Save Medications</Button>
        </form>
      </Box>
    </Container>
  );
}
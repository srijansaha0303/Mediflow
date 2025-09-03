import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';

const Container = styled.div`
  margin-top: 10px;
`;

const Input = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px;
  font-family: inherit;
  font-size: 1rem;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  resize: vertical;
`;

const Button = styled.button`
  margin-top: 6px;
  padding: 8px 14px;
  background-color: #2677b5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export default function HistoryInput() {
  const { history, setHistory } = useContext(UserContext);
  const [newEntry, setNewEntry] = useState('');

  const addEntry = () => {
    if (!newEntry.trim()) return;
    setHistory([...history, newEntry.trim()]);
    setNewEntry('');
  };

  return (
    <Container>
      <Input
        placeholder="Enter previous illness or discomfort..."
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
      />
      <Button onClick={addEntry}>Add to History</Button>
    </Container>
  );
}
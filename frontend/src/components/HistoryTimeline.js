import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';

const Container = styled.div`
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 15px;
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 3px 15px rgba(0,0,0,0.2);
  font-family: 'Poppins', sans-serif;
`;

const Entry = styled.div`
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.8rem;
`;

const Input = styled.textarea`
  width: 100%;
  height: 6rem;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  resize: none;
  margin-top: 1rem;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 1.5rem;
  color: white;
  background-color: #764ba2;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
`;

export default function HistoryTimeline() {
  const { history, setHistory } = useContext(UserContext);
  const [input, setInput] = useState('');

  function addHistory() {
    if (!input.trim()) return;
    setHistory([...history, input.trim()]);
    setInput('');
  }

  return (
    <Container>
      <h2>Discomfort / Illness Timeline</h2>
      {history.length === 0 ? (
        <p>No history recorded.</p>
      ) : (
        history.map((entry, idx) => <Entry key={idx}>{entry}</Entry>)
      )}
      <Input 
        placeholder="Add a new discomfort or illness note..." 
        value={input} 
        onChange={e => setInput(e.target.value)}
      />
      <Button onClick={addHistory}>Add Entry</Button>
    </Container>
  );
}
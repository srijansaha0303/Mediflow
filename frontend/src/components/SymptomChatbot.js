import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  max-width: 600px;
  margin: 2rem auto;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 3px 15px rgba(0,0,0,0.2);
  font-family: 'Poppins', sans-serif;
`;

const ChatLog = styled.div`
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Message = styled.div`
  margin-bottom: 0.8rem;
  font-weight: ${({ sender }) => (sender === 'bot' ? '700' : '400')};
  color: ${({ sender }) => (sender === 'bot' ? '#764ba2' : '#333')};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
`;

export default function SymptomChatbot() {
  const [log, setLog] = useState([
    { sender: 'bot', text: 'Hello! Tell me your symptoms.' }
  ]);
  const [input, setInput] = useState('');

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input.trim() };
    setLog([...log, userMessage]);

    // Simple bot reply example
    const botReply = { sender: 'bot', text: `Thanks for sharing. For "${input.trim()}", consider seeing a doctor or taking rest.` };
    setTimeout(() => {
      setLog(current => [...current, botReply]);
    }, 1000);

    setInput('');
  }

  return (
    <Container>
      <ChatLog>
        {log.map((msg, idx) => (
          <Message key={idx} sender={msg.sender}>
            {msg.text}
          </Message>
        ))}
      </ChatLog>
      <form onSubmit={handleSend}>
        <Input 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder="Type your symptoms here..."
        />
      </form>
    </Container>
  );
}
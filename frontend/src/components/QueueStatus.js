import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #e0e7ff;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.4);
  font-family: 'Poppins', sans-serif;
  margin-top: 20px;
`;

const Item = styled.p`
  margin: 0.5rem 0;
  font-size: 1.2rem;
  strong {
    color: #3b82f6;
  }
`;

export default function QueueStatus({ queueLength, nextPatient }) {
  return (
    <Container>
      <Item>Queue Length: <strong>{queueLength}</strong></Item>
      <Item>Next Patient: <strong>{nextPatient}</strong></Item>
    </Container>
  );
}
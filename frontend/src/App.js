// src/App.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  padding: 3rem;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(50,50,93,0.1);
  font-family: 'Poppins', sans-serif;
  animation: ${fadeIn} 0.8s ease forwards;
`;

const Header = styled.header`
  text-align: center;
  color: #102a43;
  margin-bottom: 2.5rem;
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: 2px;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
  background: white;
  padding: 1.6rem 2rem;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(16,42,67,0.1);
  animation: ${fadeIn} 1s ease forwards;
`;

const SectionTitle = styled.h2`
  color: #334e68;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const AlertList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const AlertItem = styled.li`
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  padding: 1rem 1.2rem;
  border-radius: 10px;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  animation: ${fadeIn} 1.2s ease forwards;
`;

const QueueInfo = styled.p`
  font-size: 1.2rem;
  color: #486581;
  margin: 0.2rem 0;
  strong {
    color: #102a43;
  }
`;

export default function App() {
  const [pillAlerts, setPillAlerts] = useState([]);
  const [queueStatus, setQueueStatus] = useState({ queue_length: 0, next_patient: '' });

  useEffect(() => {
    // Simulate API fetch with dramatic effect
    setTimeout(() => {
      setPillAlerts([
        { time: '08:00 AM', medication: 'Vitamin D' },
        { time: '01:00 PM', medication: 'Ibuprofen' },
        { time: '08:00 PM', medication: 'Omega 3' },
      ]);
      setQueueStatus({ queue_length: 7, next_patient: 'Sarah Connor' });
    }, 1200);
  }, []);

  return (
    <Container>
      <Header>Mediflow Dashboard</Header>

      <Section>
        <SectionTitle>Pill Alerts</SectionTitle>
        <AlertList>
          {pillAlerts.map(({ time, medication }, idx) => (
            <AlertItem key={idx}>
              <span>{time}</span>
              <span>{medication}</span>
            </AlertItem>
          ))}
        </AlertList>
      </Section>

      <Section>
        <SectionTitle>Queue Status</SectionTitle>
        <QueueInfo>Queue Length: <strong>{queueStatus.queue_length}</strong></QueueInfo>
        <QueueInfo>Next Patient: <strong>{queueStatus.next_patient}</strong></QueueInfo>
      </Section>
    </Container>
  );
}

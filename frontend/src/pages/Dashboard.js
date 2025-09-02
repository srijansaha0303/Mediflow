import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import MedicineList from '../components/MedicineList';
import DoctorList from '../components/DoctorList';
import QueueStatus from '../components/QueueStatus';
import Notifications from '../components/Notifications';
import bgDashboard from '../assets/bg-dashboard.jpg';

const fadeUp = keyframes`
  from {opacity: 0; transform: translateY(30px);}
  to {opacity: 1; transform: translateY(0);}
`;

const Container = styled.div`
  background: url(${bgDashboard}) no-repeat center center/cover;
  min-height: 100vh;
  padding: 2rem 3rem;
  font-family: 'Poppins', sans-serif;
  animation: ${fadeUp} 0.8s ease forwards;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 3rem;
  font-weight: 700;
  text-shadow: 0 2px 8px #000;
  margin-bottom: 2rem;
`;

const ModuleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(350px,1fr));
  gap: 2rem;
`;

const ModuleBox = styled.div`
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.45);
  }
`;

export default function Dashboard() {
  // Data states
  const [medicines, setMedicines] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [queue, setQueue] = useState({ position: 0, total: 0 });
  const [notifications, setNotifications] = useState([]);

  // Simulate API fetches
  useEffect(() => {
    setMedicines([
      { name: 'Vitamin D', days: ['Mon', 'Wed', 'Fri'] },
      { name: 'Ibuprofen', days: ['Tue', 'Thu', 'Sat'] },
      { name: 'Omega 3', days: ['Daily'] },
    ]);

    setDoctors([
      { name: 'Dr. Smith', specialty: 'Cardiologist', distance: '1.2km' },
      { name: 'Dr. Brown', specialty: 'Dermatologist', distance: '2.5km' },
    ]);

    setQueue({ position: 5, total: 20 });

    setNotifications([
      'Vitamin D – Time to take your medicine!',
      'Ibuprofen – Scheduled for today.',
    ]);
  }, []);

  return (
    <Container>
      <Title>Welcome, Sarah!</Title>
      <Notifications notifications={notifications} />
      <ModuleGrid>
        <ModuleBox onClick={() => alert('Weekly medicines')}>
          <MedicineList medicines={medicines} />
        </ModuleBox>
        <ModuleBox onClick={() => alert('Nearby doctors')}>
          <DoctorList doctors={doctors} />
        </ModuleBox>
        <ModuleBox onClick={() => alert('Queue status')}>
          <QueueStatus position={queue.position} total={queue.total} />
        </ModuleBox>
      </ModuleGrid>
    </Container>
  );
}
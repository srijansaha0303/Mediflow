import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 15px;
  max-width: 700px;
  margin: 1rem auto;
  box-shadow: 0 3px 15px rgba(0,0,0,0.2);
`;

const DoctorItem = styled.div`
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
`;

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await fetch('http://localhost:5000/doctors'); // Adjust URL if Flask runs on different host/port
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
        setDoctors([]);
      }
    }
    fetchDoctors();
  }, []);

  return (
    <Container>
      <h2>Doctors Nearby</h2>
      {doctors.length === 0 ? (
        <p>Loading doctors...</p>
      ) : (
        doctors.map((doc) => (
          <DoctorItem key={doc.id}>
            <h3>{doc.name}</h3>
            <p>Specialty: {doc.specialization}</p>
          </DoctorItem>
        ))
      )}
    </Container>
  );
}
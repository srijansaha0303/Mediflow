import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';

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
  const { doctors, setDoctors } = useContext(UserContext);

  useEffect(() => {
    // Mock loading doctors nearby with reviews
    setDoctors([
      { name: 'Dr. Sarah Connor', specialty:'Cardiologist', rating:4.8, reviews:120 },
      { name: 'Dr. John Smith', specialty:'Dermatologist', rating:4.4, reviews:89 },
      { name: 'Dr. Alan Turing', specialty:'Neurologist', rating:4.9, reviews:200 }
    ]);
  }, [setDoctors]);

  return (
    <Container>
      <h2>Doctors Nearby</h2>
      {doctors.length === 0 ? (
        <p>Loading doctors...</p>
      ) : (
        doctors.map((doc, idx) => (
          <DoctorItem key={idx}>
            <h3>{doc.name}</h3>
            <p>Specialty: {doc.specialty}</p>
            <p>Rating: {doc.rating} ⭐ ({doc.reviews} reviews)</p>
          </DoctorItem>
        ))
      )}
    </Container>
  );
}
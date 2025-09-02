import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 2rem;
  max-width: 700px;
  margin: 2rem auto;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

const DaySection = styled.div`
  margin-bottom: 1rem;
`;

const MedicineItem = styled.li`
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

export default function MedicineWeek({ weeklyMeds }) {
  return (
    <Container>
      <Title>Medicines for the Week</Title>
      {Object.entries(weeklyMeds).map(([day, meds]) => (
        <DaySection key={day}>
          <h3>{day}</h3>
          <ul>
            {meds.map((med, i) => (
              <MedicineItem key={i}>
                {med.name} at {med.time} – Dose: {med.dose} mg
              </MedicineItem>
            ))}
          </ul>
        </DaySection>
      ))}
    </Container>
  );
}
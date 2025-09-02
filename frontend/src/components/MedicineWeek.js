import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  max-width: 400px;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  padding: 0.7rem 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

export default function Medicine({ medicines }) {
  return (
    <Container>
      <Title>Medicines for Today</Title>
      {medicines && medicines.length > 0 ? (
        <List>
          {medicines.map((med, idx) => (
            <ListItem key={idx}>
              {med.name} - {med.dose}mg at {med.time}
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No medicines scheduled for today.</p>
      )}
    </Container>
  );
}
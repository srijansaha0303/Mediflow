import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  padding: 0;
  list-style-type: none;
  color: #333;
`;

const Item = styled.li`
  border-bottom: 1px solid #ccc;
  padding: 0.6rem 0;
  font-weight: 600;
`;

export default function MedicineList({ medicines }) {
  return (
    <div>
      <h3>Medicines for this week</h3>
      <List>
        {medicines.map(({ name, days }, idx) => (
          <Item key={idx}>{name} – {days.join(', ')}</Item>
        ))}
      </List>
    </div>
  );
}
import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  padding: 0;
  list-style-type: none;
  color: #222;
`;

const Item = styled.li`
  padding: 0.6rem 0;
  border-bottom: 1px solid #ddd;
`;

export default function DoctorList({ doctors }) {
  return (
    <div>
      <h3>Nearby Doctors</h3>
      <List>
        {doctors.map(({ name, specialty, distance }, idx) => (
          <Item key={idx}>
            <strong>{name}</strong> ({specialty}) - {distance}
          </Item>
        ))}
      </List>
    </div>
  );
}
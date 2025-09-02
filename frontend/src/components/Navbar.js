import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  background: #764ba2;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-family: 'Poppins', sans-serif;
`;

const Logo = styled(Link)`
  font-weight: 700;
  font-size: 1.5rem;
  text-decoration: none;
  color: white;
`;

const Menu = styled.div`
  display: flex;
  gap: 1.2rem;

  @media (max-width: 600px) {
    display: none;
  }
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 3px;
    width: 25px;
    background: white;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 600px) {
    display: flex;
  }
`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <Nav>
      <Logo to="/">MediFlow</Logo>
      <Menu style={{ display: open ? 'flex' : undefined, flexDirection: 'column', position: 'absolute', top: '60px', right: '20px', backgroundColor: '#764ba2', padding: '1rem', borderRadius: '10px' }}>
        <MenuItem to="/">Login</MenuItem>
        <MenuItem to="/signup">Sign Up</MenuItem>
        <MenuItem to="/dashboard">Dashboard</MenuItem>
      </Menu>
      <Hamburger onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </Hamburger>
    </Nav>
  );
}
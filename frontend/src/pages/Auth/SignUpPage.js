import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Container = styled.div`
  height: 100vh;
  background: url('/assets/bg-login.jpg') no-repeat center center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background: rgba(255,255,255,0.9);
  padding: 3rem 4rem;
  border-radius: 20px;
  max-width: 400px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1.5px solid #ccc;
  &:focus {
    border-color: #764ba2;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #764ba2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  margin-bottom: 10px;
`;

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();
    if (localStorage.getItem(email)) {
      alert('Email already registered');
      return;
    }
    const user = { name, email, password, medications: [] };
    localStorage.setItem(email, JSON.stringify(user));
    alert('Registration successful! Please enter your daily medications.');
    navigate('/medications');
  }

  return (
    <Container>
      <Box>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <Input 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required
          />
          <Input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            minLength={6}
          />
          <Button type="submit">Register</Button>
        </form>
        <p>Already have an account? <Link to="/">Login here</Link></p>
      </Box>
    </Container>
  );
}
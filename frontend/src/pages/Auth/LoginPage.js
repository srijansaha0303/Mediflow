import React, { useState, useContext } from 'react';
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
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
`;

export default function LoginPage() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const stored = localStorage.getItem(email);
    if (!stored) {
      alert('User not found');
      return;
    }
    const user = JSON.parse(stored);
    if (user.password !== password) {
      alert('Incorrect password');
      return;
    }
    setUser(user);
    if (!user.medications || user.medications.length === 0) {
      navigate('/medications');
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <Container>
      <Box>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          />
          <Button type="submit">Login</Button>
        </form>
        <p>New user? <Link to="/signup">Sign up here</Link></p>
      </Box>
    </Container>
  );
}
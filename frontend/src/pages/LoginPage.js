import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  from {opacity: 0; transform: translateY(20px);}
  to {opacity: 1; transform: translateY(0);}
`;

const Container = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
`;

const Box = styled.div`
  background: white;
  padding: 3rem 4rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  max-width: 400px;
  animation: ${fadeIn} 0.7s ease forwards;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid #764ba2;
`;

const Tab = styled.button`
  flex: 1;
  padding: 0.8rem 0;
  background: ${({ active }) => (active ? '#764ba2' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#764ba2')};
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #6a11cb;
    color: white;
  }
`;

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  // Called by LoginForm on successful login with username
  const handleLogin = (userName) => {
    // Redirect to dashboard after login
    navigate('/dashboard');
  };

  // Switch to login tab after signup
  const handleSignUpSwitch = () => setActiveTab('login');

  return (
    <Container>
      <Box>
        <Tabs>
          <Tab active={activeTab === 'login'} onClick={() => setActiveTab('login')}>
            Login
          </Tab>
          <Tab active={activeTab === 'signup'} onClick={() => setActiveTab('signup')}>
            Sign Up
          </Tab>
        </Tabs>

        {activeTab === 'login' ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <SignUpForm onSignUp={handleSignUpSwitch} />
        )}
      </Box>
    </Container>
  );
}
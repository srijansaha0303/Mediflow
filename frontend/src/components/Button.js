import styled from 'styled-components';

const Button = styled.button`
  background-color: #764ba2;
  color: white;
  padding: 0.7rem 1.5rem;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6a11cb;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

export default Button;
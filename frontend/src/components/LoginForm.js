import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { UserContext } from '../context/UserContext';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
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
  padding: 12px;
  background: #764ba2;
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #6a11cb;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

export default function LoginForm({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const storedUser = localStorage.getItem(data.email);
    if (!storedUser) {
      alert("User not found. Please sign up.");
      return;
    }
    const user = JSON.parse(storedUser);
    if (user.password !== data.password) {
      alert("Incorrect password!");
      return;
    }
    onLogin(user.name);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
      />
      {errors.email && <Error>Email is required</Error>}

      <Input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      {errors.password && <Error>Password is required</Error>}

      <Button type="submit">Login</Button>
    </Form>
  );
}
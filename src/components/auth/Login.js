import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import OAuthLogin from './OAuthLogin';

const LoginContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 40px auto;
  padding: 40px;
  background-color: rgba(255,255,255,0.3);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1010;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  margin-bottom: 10px;
  background-color: rgba(192, 192, 192);  
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgba(160, 160, 160);  
  }
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 14px;
`;

const Login = () => {
  const loginRef = useRef(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력하세요.');
      return false;
    }
    if (password.length < 8) {
      setError('패스워드는 8글자 이상 입력하세요.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form is valid');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        navigate('/'); 
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]); 
  

  return (
    <LoginContainer ref={loginRef}>
      <CloseButton onClick={handleClose}>&times;</CloseButton>
      <Title>Login</Title>
      <LoginForm onSubmit={handleSubmit}>
        <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button type="submit">로그인</Button>
      </LoginForm>
      <OAuthLogin />
    </LoginContainer>
  );
};

export default Login;

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: rgba(192, 192, 192, 0.1);
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  height: 50px;  
  width: 150px;  
  margin: 0;

  a {
    display: inline-block;
    height: 100%;
    width: 100%;
    background-image: url('/images/mycarlong_original.png'); 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const NavLinks = styled.div`
  a {
    color: gray;
    margin-left: 20px;
    font-size: 16px;
    text-decoration: none;
    &:hover {
      color: rgb(191, 193, 194);
    }

    &:nth-last-child(3) {
      margin-right: 50px; 
    }
  }

  a:nth-last-child(1),
  a:nth-last-child(2) {
    color: rgb(170, 170, 170);
    &:hover {
      color: gray;
    }
  }
`;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const simulateLogin = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true); 
      }, 1000); 
    });
  };

  const handleLoginClick = async () => {
    const result = await simulateLogin(); 
    if (result) {
      setIsLoggedIn(true); 
    }
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false); 
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo>
          <Link to="/" />
        </Logo>
        <NavLinks>
          <Link to="/aboutus">사이트소개</Link>
          <Link to="/chatapp">AI채팅</Link>
          <Link to="/nearby">내주변검색</Link>
          <Link to="/vehicles">모두의차고</Link>
          {isLoggedIn ? (
            <>
              <Link to="/" onClick={handleLogoutClick}>로그아웃</Link>
              <Link to="/mypage">마이페이지</Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={handleLoginClick}>로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
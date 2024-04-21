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
    color: rgb(191, 193, 194);
    margin-left: 20px;
    font-size: 16px;
    text-decoration: none;
    &:hover {
      color: gray;
    }

    &:nth-last-child(3) {
      margin-right: 50px; 
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
          <Link to="/nearby">Nearby</Link>
          <Link to="/vehicles">Vehicles</Link>
          <Link to="/services">Services</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/customers">Customers</Link>
          {isLoggedIn ? (
            <>
              <Link to="/" onClick={handleLogoutClick}>Logout</Link>
              <Link to="/mypage">MyPage</Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={handleLoginClick}>Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
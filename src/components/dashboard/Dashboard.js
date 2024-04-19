import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FiHome, FiList, FiTool, FiSettings, FiChevronRight, FiChevronLeft } from 'react-icons/fi'; 

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: ${({ isOpen }) => isOpen ? '200px' : '50px'};
  background: ${({ image }) => `url(${image}) center center / cover no-repeat, rgba(0, 0, 0, 0.5)`};
  background-blend-mode: overlay;
  transition: width 0.3s ease-in-out, background 0.5s ease-in-out;
  color: white;
  padding: ${({ isOpen }) => isOpen ? '20px' : '20px 10px'};
  display: flex;
  flex-direction: column;
  align-items: ${({ isOpen }) => isOpen ? 'flex-start' : 'center'};
  animation: ${fadeIn} 0.5s;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: ${({ isOpen }) => isOpen ? '10px 0' : '15px 0'}; 
  display: flex;
  align-items: center;
  gap: ${({ isOpen }) => isOpen ? '10px' : '0'};
  justify-content: ${({ isOpen }) => isOpen ? 'start' : 'center'};
  width: 100%;
  transition: background-color 0.3s ease, color 0.5s ease; 

  &:hover, &.active {
    color: gray;
    background-color: white;
    border-radius: 10px 0 0 10px;
  }
`;


const ToggleButton = styled.button`
  padding-top: 20px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  align-self: flex-end;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 30px;
  background-color: #f8f9fa;
`;

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState('/images/dashboard.jpg'); 
  const [activeNav, setActiveNav] = useState('/dashboard');

  const handleNavClick = (path, image, event) => {
    event.preventDefault(); 
    setSelectedImage(image);
    setActiveNav(path);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <Sidebar isOpen={isOpen} image={selectedImage}>
        <NavItem to="/dashboard" className={activeNav === '/dashboard' ? 'active' : ''} isOpen={isOpen} onClick={(e) => handleNavClick('/dashboard', '/images/dashboard.jpg', e)}><FiHome /> {isOpen && 'Dashboard'}</NavItem>
        <NavItem to="/vehiclelist" className={activeNav === '/vehiclelist' ? 'active' : ''} isOpen={isOpen} onClick={(e) => handleNavClick('/vehiclelist', '/images/vehicle-1.jpg', e)}><FiList /> {isOpen && 'Vehicle List'}</NavItem>
        <NavItem to="/maintenance" className={activeNav === '/maintenance' ? 'active' : ''} isOpen={isOpen} onClick={(e) => handleNavClick('/maintenance', '/images/maintenance-1.jpg', e)}><FiTool /> {isOpen && 'Maintenance'}</NavItem>
        <NavItem to="/settings" className={activeNav === '/settings' ? 'active' : ''} isOpen={isOpen} onClick={(e) => handleNavClick('/settings', '/images/setting-1.jpg', e)}><FiSettings /> {isOpen && 'Settings'}</NavItem>
        <ToggleButton onClick={toggleSidebar}>
          {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        </ToggleButton>
      </Sidebar>
      <MainContent>
        <h1>Dashboard</h1>
      </MainContent>
    </Container>
  );
};

export default Dashboard;

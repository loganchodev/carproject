import React, { useState } from 'react';
import styled from 'styled-components';
import { FiHome, FiList, FiTool, FiSettings, FiChevronRight, FiChevronLeft } from 'react-icons/fi'; 
import SideNav from '../sidenav/SideNav';
import NavItem from '../sidenav/NavItem';
import ToggleButton from '../sidenav/ToggleButton';
import DashboardContent from '../content/DashboardContent';

const Container = styled.div`
  display: flex;
  height: 100vh;
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
      <SideNav isOpen={isOpen} image={selectedImage}>
        <NavItem to="/dashboard" className={activeNav === '/dashboard' ? 'active' : ''} isOpen={isOpen} onClick={(e) => handleNavClick('/dashboard', '/images/dashboard.jpg', e)}><FiHome /> {isOpen && 'Dashboard'}</NavItem>
        <NavItem to="/vehiclelist" className={activeNav === '/vehiclelist' ? 'active' : ''} isOpen={isOpen} onClick={(e) => handleNavClick('/vehiclelist', '/images/vehicle-1.jpg', e)}><FiList /> {isOpen && 'Vehicle List'}</NavItem>
        <NavItem to="/maintenance" className={activeNav === '/maintenance' ? 'active' : ''} isOpen={isOpen} onClick={(e) => handleNavClick('/maintenance', '/images/maintenance-1.jpg', e)}><FiTool /> {isOpen && 'Maintenance'}</NavItem>
        <NavItem to="/settings" className={activeNav === '/settings' ? 'active' : ''} isOpen={isOpen} onClick={(e) => handleNavClick('/settings', '/images/setting-1.jpg', e)}><FiSettings /> {isOpen && 'Settings'}</NavItem>
        <ToggleButton onClick={toggleSidebar}>
          {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        </ToggleButton>
      </SideNav>
      <DashboardContent activeNav={activeNav} />
    </Container>
  );
};

export default Dashboard;

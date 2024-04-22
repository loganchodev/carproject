import React, { useState } from 'react';
import styled from 'styled-components';
import { FiHome, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SideNav from '../sidenav/SideNav';
import NavItem from '../sidenav/NavItem';
import ToggleButton from '../sidenav/ToggleButton';
import MapComponent from '../content/MapComponent';
import NearbyContent from '../content/NearbyContent';

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: white;
`;

const ContentArea = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const MapContainer = styled.div`
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Nearby = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState('/images/nearby.jpg'); 
  const [activeNav, setActiveNav] = useState('/nearby');

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
        <NavItem to="/nearby" className={activeNav === '/nearby' ? 'active' : ''} isOpen={isOpen} onClick={(e) => handleNavClick('/nearby', '/images/nearby.jpg', e)}>
          <FiHome /> {isOpen && 'Nearby'}
        </NavItem>
        <ToggleButton onClick={toggleSidebar}>
          {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        </ToggleButton>
      </SideNav>
      <ContentArea>
        <NearbyContent activeNav={activeNav} />
        <MapContainer>
          <MapComponent />
        </MapContainer>
      </ContentArea>
    </Container>
  );
};

export default Nearby;

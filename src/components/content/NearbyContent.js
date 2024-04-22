import React from 'react';
import styled from 'styled-components';

const StyledNearbyContent = styled.div`
  flex-grow: 0;
  padding: 20px;
  background-color: #f8f9fa;
`;

const NearbyContent = () => {
  return (
    <StyledNearbyContent>
      <h1>Nearby</h1> 
    </StyledNearbyContent>
  );
};

export default NearbyContent;

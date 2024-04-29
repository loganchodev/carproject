import React from 'react';
import styled from 'styled-components';
import VehicleDetail from '../vehicles/VehicleDetail';

const StyledVehicleContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

const VehicleContent = ({ activeNav }) => {
  let content;
  switch (activeNav) {
    case '/vehicle':
      content = <h1>자동차</h1>;
      break;
    case '/vehicledetail':
      content = <h1>차량상세</h1>;
      break;
    default:
      content = <h1>자동차</h1>; 
  }

  return (
    <StyledVehicleContent>
      {content}
      {activeNav === '/vehicledetail' && <VehicleDetail />}
    </StyledVehicleContent>
  );
};

export default VehicleContent;

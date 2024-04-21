import React from 'react';
import styled from 'styled-components';

const StyledDashboardContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

const DashboardContent = ({ activeNav }) => {
  let content;
  switch (activeNav) {
    case '/dashboard':
      content = <h1>Dashboard</h1>;
      break;
    case '/vehiclelist':
      content = <h1>Vehicle List</h1>;
      break;
    case '/maintenance':
      content = <h1>Maintenance</h1>;
      break;
    case '/settings':
      content = <h1>Settings</h1>;
      break;
    default:
      content = <h1>Dashboard</h1>; 
  }

  return <StyledDashboardContent>{content}</StyledDashboardContent>;
};

export default DashboardContent;

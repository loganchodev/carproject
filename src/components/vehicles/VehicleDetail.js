import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f0f0f0;
  height: 80%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TextDisplay = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 80%;
  max-width: 800px;
  color: #333;
  line-height: 1.5;
  font-size: 18px;
  text-align: left;
  white-space: pre-wrap; 
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

function VehicleDetail() {
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    setError('');
    setVehicleDetails('');
    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:5000/api/vehicle', { model, year });
      if (response.data && response.status === 200) {
        const formattedText = formatData(response.data);
        setVehicleDetails(formattedText);
      } else {
        setError('No vehicle information found. Please check the input details.');
      }
    } catch (err) {
      console.error('Error fetching vehicle data:', err);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };

  const formatData = (data) => {
    if (data && data.vehicleSpecs) {
      const vehicleSpecs = data.vehicleSpecs;
      let formattedText = '';
  
      for (const key in vehicleSpecs) {
        if (Object.hasOwnProperty.call(vehicleSpecs, key)) {
          const value = vehicleSpecs[key];
          formattedText += `${key}: ${value}\n`;
        }
      }
      
      return formattedText;
    } else {
      console.log('응답 데이터:', data); 
      return 'No vehicle information found.';
    }
  };  
  
  return (
    <Container>
      <Form onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </Form>
      {loading ? ( 
        <LoadingContainer>
          <BeatLoader color="#007bff" loading={loading} />
        </LoadingContainer>
      ) : (
        <>
          {error && <TextDisplay>{error}</TextDisplay>}
          {vehicleDetails && <TextDisplay>{vehicleDetails}</TextDisplay>}
        </>
      )}
    </Container>
  );
}

export default VehicleDetail;

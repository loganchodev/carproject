import React, { useState } from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button as MuiButton, Typography } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios'; 
import ReactCardFlip from 'react-card-flip'; 
import CommentForm from '../comment/CommentForm';
import CommentMain from '../comment/CommentMain';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 87%;
  height: 80%;
  background: #f0f0f0;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 2px solid #78909C;
  border-radius: 5px;
  color: #78909C;
  font-size: 16px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #78909C;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.7s ease-in-out;

  &:hover {
    background-color: #B0BEC5;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const CardContainer = styled.div`
  width: 550px;
  margin-right: 30px;
`;

const CommentContainer = styled.div`
  flex: 1;
  transition: opacity 0.5s ease;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
`;

function VehicleGarage() {
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [vehicles, setVehicles] = useState([
    { id: 1, model: 'Hyundai Sonata', year: '2024', image: 'https://source.unsplash.com/random/300x200', info: 'Comfortable and efficient', isFlipped: false }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:8097/vehiclegarage', {
        model: model,
        year: year
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleWrite = () => {
    setShowForm(!showForm);
  };

  const handleCardFlip = (id, event) => {
    if (event.target.tagName !== "BUTTON") {
      setVehicles(vehicles.map(vehicle => {
        if (vehicle.id === id) {
          return { ...vehicle, isFlipped: !vehicle.isFlipped };
        } else {
          return vehicle;
        }
      }));
    }
  };

  const toggleCommentVisibility = () => {
    setCommentVisible(!commentVisible);
  };

  return (
    <Container>
      <Form onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="모델명"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <Input
          type="text"
          placeholder="연식"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <StyledButton type="submit">조회</StyledButton>
      </Form>
      <MainContent>
        <CardContainer>
          {vehicles.map(vehicle => (
            <ReactCardFlip key={vehicle.id} isFlipped={vehicle.isFlipped}>
              <Card key="front" onClick={(event) => handleCardFlip(vehicle.id, event)}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                    image={vehicle.image}
                    alt={vehicle.model}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {vehicle.model} - {vehicle.year}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {vehicle.info}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <MuiButton size="small" color="primary" onClick={handleWrite}>
                    글작성
                  </MuiButton>
                  <MuiButton size="small" color="primary" onClick={toggleCommentVisibility}>
                    글보기
                  </MuiButton>
                </CardActions>
              </Card>
              <Card key="back" onClick={(event) => handleCardFlip(vehicle.id, event)}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Back content
                  </Typography>
                </CardContent>
              </Card>
            </ReactCardFlip>
          ))}
          {showForm && <CommentForm />}
        </CardContainer>
        <CommentContainer visible={commentVisible}>
          <CommentMain />
        </CommentContainer>
      </MainContent>
    </Container>
  );
}

export default VehicleGarage;

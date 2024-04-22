import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';
import Slider, { SliderThumb } from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import styled, { css } from 'styled-components';

const MapContainer = styled.div`
  background-color: #f4f5f7;
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MapWrapper = styled.div`
  width: 50%;  
  height: 400px;  
  margin-bottom: 10px;
  padding: 10px;
`;

const InputContainer = styled.div`
  width: 50%;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
`;

const PlacesList = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #333;
`;

const GreySlider = styled(Slider)`
  color: #757575; 

  & .MuiSlider-thumb {
    background-color: #bdbdbd;
  }
`;

function MapComponent() {
  const [radius, setRadius] = useState(1000);
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [types, setTypes] = useState(['gas_station', 'car_repair']);
  const googleMapsLibraries = ['places']; // 상수로 선언하여 변하지 않도록 합니다.

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      () => {
        alert('위치 정보를 가져올 수 없습니다.');
        setLocation({ lat: 37.5665, lng: 126.9780 }); 
      }
    );
  }, []);

  const handleRadiusChange = (event, newValue) => {
    setRadius(newValue * 1000);
  };

  const handleTypeChange = (event) => {
    const type = event.target.name;
    if (event.target.checked) {
      setTypes([...types, type]);
    } else {
      setTypes(types.filter(t => t !== type));
    }
  };

  const onMapLoad = (map) => {
    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch({
      location,
      radius,
      types
    }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
        console.log(results); 
      } else {
        console.error('Places Service failed:', status);
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={googleMapsLibraries}
      async
      defer
    >
      <MapContainer>
        <MapWrapper>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={location}
            zoom={15}
            onLoad={onMapLoad}
          >
            {location && <Marker position={location} />}
            {location && <Circle center={location} radius={radius} />}
            {places.map((place, index) => (
              <Marker key={index} position={place.geometry.location} />
            ))}
          </GoogleMap>
        </MapWrapper>
        <InputContainer>
          <FormControlLabel
            control={<Checkbox checked={types.includes('gas_station')} onChange={handleTypeChange} name="gas_station" />}
            label="주유소"
          />
          <FormControlLabel
            control={<Checkbox checked={types.includes('car_repair')} onChange={handleTypeChange} name="car_repair" />}
            label="서비스센터"
          />
          <GreySlider
            value={radius / 1000}
            onChange={handleRadiusChange}
            aria-labelledby="radius-slider"
            min={0}
            max={5}
            valueLabelDisplay="auto"
            marks
          />
        </InputContainer>
        <PlacesList>
          {places.map((place, index) => (
            <div key={index}>{place.name}</div>
          ))}
        </PlacesList>
      </MapContainer>
    </LoadScript>
  );
}

export default MapComponent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../../App.css'; 

function VehicleInfo() {
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/vehicle?make=toyota&model=camry&year=2020');
                setVehicle(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <TransitionGroup>
            {vehicle ? (
                <CSSTransition key={vehicle.id} timeout={500} classNames="fade">
                    <div>
                        <h1>{vehicle.make} {vehicle.model} ({vehicle.year})</h1>
                        <p>가격: {vehicle.price}</p>
                        <p>연료 유형: {vehicle.fuelType}</p>
                        <p>연비: {vehicle.mpg}</p>
                        <p>출력: {vehicle.horsepower} hp</p>
                        <p>엔진: {vehicle.engineType}</p>
                    </div>
                </CSSTransition>
            ) : (
                <CSSTransition timeout={500} classNames="fade">
                    <p>Loading vehicle data...</p>
                </CSSTransition>
            )}
        </TransitionGroup>
    );
}

export default VehicleInfo;

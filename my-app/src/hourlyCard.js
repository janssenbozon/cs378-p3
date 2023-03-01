import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const HourlyCard = ({ city, weatherData }) => {
  console.log(weatherData)
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
      <Card.Text className="h6 text-dark">Hourly forecast for</Card.Text>
      <Card.Text className="h1 text-dark">{city}</Card.Text>
      <div class="border-top my-3"></div>
      {Object.keys(weatherData).map((time) =>
        <Row>
        <Col>
        <Card.Text className="h6 text-center text-dark">{time}</Card.Text>
        </Col>
        <Col>
        <Card.Text className="h6 text-center text-dark text-bold">{weatherData[time]}</Card.Text>
        </Col>
        </Row>
      )}
      </Card.Body>
    </Card>
  );
};

export default HourlyCard;

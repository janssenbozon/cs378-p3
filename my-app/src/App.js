import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HourlyCard from './hourlyCard';
import { useEffect, useState } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';

function App() {

  const [latitude, setLatitude] = useState(29.76);
  const [longitude, setLongitude] = useState(-95.36)
  const [latitudeField, setLatitudeField] = useState(29.76);
  const [longitudeField, setLongitudeField] = useState(-95.36)
  const [city, setCity] = useState("Houston");
  const [weatherData, setWeatherData] = useState({});

  function latitudeChange (event) {
    setLatitudeField(event.target.value)
  }

  function longitudeChange (event) {
    setLongitudeField(event.target.value)
  }

  function onSubmit (event) {
    event.preventDefault();
    setCity(latitudeField + "," + latitudeField);
    setLatitude(latitudeField);
    setLongitude(longitudeField);
  }

  function handleAustinClick () {
    setCity("Austin");
    setLatitude(30.27);
    setLongitude(-97.75);
  }

  function handleHoustonClick () {
    setCity("Houston");
    setLatitude(29.76);
    setLongitude(-95.36);
  }

  function handleDallasClick () {
    setCity("Dallas");
    setLatitude(32.78);
    setLongitude(-96.80);
  }

  const fetchWeatherData = async() => {
    try {
      const url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&hourly=temperature_2m&temperature_unit=fahrenheit"
      const response = await fetch(url);
      const json = await response.json();
      const hourlyDataRaw = json.hourly;
      const rawTimes = hourlyDataRaw.time;
      const rawTemps = hourlyDataRaw.temperature_2m;
      const hourly = {}
  
      for(let i = 0 ; i < 10; i++) {
        let times = rawTimes[i].substr(-5);
        let temp = rawTemps[i] + "\u00B0"
        hourly[times] = temp;
      }

      setWeatherData(hourly);
  
    } catch (err) {
        console.log("No data available!");
    } finally {
  
    }
  }

  useEffect(() => {
    fetchWeatherData();
  }, [latitude, longitude, city])

  return (
    <div className="App">
      <header className="App-header">
        <Row>
          <p>See some pre-selected cities:</p>
          <Col>
            <Button onClick={handleAustinClick}>Austin</Button>
          </Col>
          <Col>
            <Button onClick={handleHoustonClick}>Houston</Button>
          </Col>
          <Col>
            <Button onClick={handleDallasClick}>Dallas</Button>
          </Col>
        </Row>
        <hr/>
        <p>Or seach for your own:</p>
        <Row>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Latitude" onChange={latitudeChange}/>
            <Form.Control type="text" placeholder="Longitude" onChange={longitudeChange}/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Search
          </Button>
        </Form>
        </Row>
        <hr/>
        <HourlyCard city={city} weatherData={weatherData}></HourlyCard>
      </header>
    </div>
  );
}

export default App;

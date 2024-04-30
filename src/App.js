import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = process.env.API_KEY; 

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/3.0/weather?q=${city}&appid=${API_KEY}&units=metric`);
      console.log(response); // Hier das API-Antwort-Objekt ausgeben
      setWeather(response.data);
      setError('');
    } catch (error) {
      console.error(error); // Hier den Fehler ausgeben
      setError('Stadt nicht gefunden!');
      setWeather(null);
    }
  };
  
  return (
    <div className="App">
      <h1>Wetter App</h1>
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Stadt eingeben"
          className="search-input"
        />
        <button onClick={fetchWeather} className="search-button">Wetter abrufen</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-container">
          <h2 className="city-name">{weather.name}, {weather.sys.country}</h2>
          <p className="temperature">Temperatur: {weather.main.temp} °C</p>
          <p className="description">Wetter: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;

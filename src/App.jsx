import { useState, useEffect } from 'react';
import { loadWeather } from './weather.js';
import SearchBar from './components/SearchBar.jsx';
import StatusMessage from './components/StatusMessage.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import WeatherCard from './components/WeatherCard.jsx';

export default function App() {
  const [city, setCity] = useState('Bratislava');
  const [attempt, setAttempt] = useState(0);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setStatus('loading');
      try {
        setData(await loadWeather(city));
        setStatus('success');
      } catch (err) {
        setError(err);
        setStatus('error');
      }
    }
    load();
  }, [city, attempt]);

  function handleSearch(newCity) {
    if (!newCity) {
      setStatus('empty');
      return;
    }
    setCity(newCity);
    setAttempt(a => a + 1);
  }

  return (
    <main className="app">
      <h1>Weather Dashboard</h1>
      <p className="intro">Live conditions for any city in the world.</p>

      <SearchBar onSearch={handleSearch} loading={status === 'loading'} />

      <div className="status-row">
        {status === 'loading' && <StatusMessage state="loading">Loading {city}…</StatusMessage>}
        {status === 'empty' && <StatusMessage state="idle">Type a city name first.</StatusMessage>}
        {status === 'success' && <StatusMessage state="success">Showing live weather for {data.name}.</StatusMessage>}
        {status === 'error' && <ErrorMessage error={error} city={city} onRetry={() => setAttempt(a => a + 1)} />}
      </div>

      {data && status !== 'error' && <WeatherCard data={data} />}
    </main>
  );
}

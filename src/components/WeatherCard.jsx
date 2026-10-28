import { describe } from '../conditions.js';
import ForecastDay from './ForecastDay.jsx';

export default function WeatherCard({ data }) {
  const { name, region, country, current, daily } = data;
  const now = describe(current.weather_code);

  return (
    <section className="weather">
      <h2>{[name, region, country].filter(part => part).join(', ')}</h2>
      <p className="muted">Updated {current.time.replace('T', ' ')} (local time)</p>

      <div className="now">
        <span className="icon" role="img" aria-label={now.label}>{now.icon}</span>
        <div>
          <p className="temp">{Math.round(current.temperature_2m)}°C</p>
          <p>{now.label}</p>
        </div>
      </div>

      <ul className="details">
        <li>Feels like <strong>{Math.round(current.apparent_temperature)}°C</strong></li>
        <li>Humidity <strong>{current.relative_humidity_2m}%</strong></li>
        <li>Wind <strong>{current.wind_speed_10m} km/h</strong></li>
      </ul>

      <h3>Next 3 days</h3>
      <ul className="forecast">
        {daily.time.map((day, i) => (
          <ForecastDay
            key={day}
            day={i === 0 ? 'Today' : day}
            code={daily.weather_code[i]}
            max={daily.temperature_2m_max[i]}
            min={daily.temperature_2m_min[i]}
          />
        ))}
      </ul>
    </section>
  );
}

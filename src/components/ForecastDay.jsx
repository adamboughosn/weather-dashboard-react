import { describe } from '../conditions.js';

export default function ForecastDay({ day, code, max, min }) {
  const { label, icon } = describe(code);

  return (
    <li>
      <strong>{day}</strong>
      <div className="day-icon">{icon}</div>
      <div>{label} · {Math.round(max)}° / {Math.round(min)}°</div>
    </li>
  );
}

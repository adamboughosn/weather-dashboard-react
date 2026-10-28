import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(text.trim());
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <label htmlFor="city-input" className="visually-hidden">City name</label>
      <input
        id="city-input"
        type="text"
        placeholder="e.g. Beirut, Tokyo, Bratislava"
        autoComplete="off"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit" disabled={loading}>Search</button>
    </form>
  );
}

import React, { useState } from 'react';
import './Buscador.css';

const Buscador = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="buscador-container">
      <input
        type="text"
        placeholder="Buscar publicaciones..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Buscador;

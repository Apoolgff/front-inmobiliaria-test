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
        className="buscador-input"
        type="text"
        placeholder="Buscar publicaciones..."
        value={query}
        onChange={handleSearch}
      />
      <button className="buscador-boton"><img src="/icons/search-icon.svg" alt="" /></button>
    </div>
  );
};

export default Buscador;

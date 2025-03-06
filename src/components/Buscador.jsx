import React, { useState } from 'react';
import './Buscador.css';

const Buscador = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [tipo, setTipo] = useState('venta');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value, tipo);
  };

  const handleTipoChange = (e) => {
    const newTipo = e.target.value;
    setTipo(newTipo);
    onSearch(query, newTipo);
  };

  return (
    <div className="buscador-container">
      <div className="buscador-selector">
        <div className="selector-background" style={{ left: tipo === 'venta' ? '0px' : '48%' }}></div>
        <input
          type="radio"
          id="venta"
          value="venta"
          checked={tipo === "venta"}
          onChange={handleTipoChange}
        />
        <label htmlFor="venta">Venta</label>

        <input
          type="radio"
          id="alquiler"
          value="alquiler"
          checked={tipo === "alquiler"}
          onChange={handleTipoChange}
        />
        <label htmlFor="alquiler">Alquiler</label>
      </div>

      <input
        className="buscador-input"
        type="text"
        placeholder="Buscar publicaciones..."
        value={query}
        onChange={handleSearch}
      />
      <button className="buscador-boton">
        <img src="/icons/search-icon.svg" alt="Buscar" />
      </button>
    </div>
  );
};

export default Buscador;

import React, { useState } from 'react';
import './Filtros.css';

const Filtros = ({ onApplyFilters }) => {
    const [tipo, setTipo] = useState({
        Casa: false,
        Apartamento: false,
        Terreno: false,
        Local: false,
        Chacra: false,
    });
    const [venta, setVenta] = useState(false);
    const [alquiler, setAlquiler] = useState(false);

    const handleTipoChange = (property) => {
        setTipo((prev) => {
            const updated = { ...prev, [property]: !prev[property] };
            onApplyFilters({ tipo: updated, venta, alquiler });
            return updated;
        });
    };

    const handleVentaChange = (e) => {
        const newVenta = e.target.checked;
        setVenta(newVenta);
        onApplyFilters({ tipo, venta: newVenta, alquiler });
    };

    const handleAlquilerChange = (e) => {
        const newAlquiler = e.target.checked;
        setAlquiler(newAlquiler);
        onApplyFilters({ tipo, venta, alquiler: newAlquiler });
    };

    return (
        <div className="filtros-container">
            <h3>Filtros</h3>
            <div className="filtro-item">
                <label>Tipo de Propiedad:</label>
                <div className="checkbox-group">
                    {Object.keys(tipo).map((property) => (
                        <div key={property} className="checkbox-row">
                            <span>{property.charAt(0).toUpperCase() + property.slice(1)}</span>
                            <input
                                type="checkbox"
                                checked={tipo[property]}
                                onChange={() => handleTipoChange(property)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <label>Estado de la propiedad:</label>
            <div className="filtro-item">
                <div className="checkbox-row">
                    <span>En Venta</span>
                    <input
                        type="checkbox"
                        checked={venta}
                        onChange={handleVentaChange}
                    />
                </div>
            </div>
            <div className="filtro-item">
                <div className="checkbox-row">
                    <span>En Alquiler</span>
                    <input
                        type="checkbox"
                        checked={alquiler}
                        onChange={handleAlquilerChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Filtros;

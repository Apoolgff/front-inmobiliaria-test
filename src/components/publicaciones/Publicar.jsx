import React, { useState } from "react";
import PublicarApartamento from "./PublicarApartamento";
import PublicarCasa from "./PublicarCasa";
import PublicarChacra from "./PublicarChacra";
import PublicarTerreno from "./PublicarTerreno";
import PublicarLocal from "./PublicarLocal";
import UserNavbar from "../usuarios/UserNavbar";
import "./Publicar.css"; // Asegúrate de tener estilos adecuados

const Publicar = () => {
    const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const handleCardClick = () => {
        setMostrarOpciones(true);
        setTipoSeleccionado(null); // Resetear selección al cambiar de card
    };

    const handleSelectChange = (event) => {
        setTipoSeleccionado(event.target.value);
    };

    const renderComponenteSeleccionado = () => {
        switch (tipoSeleccionado) {
            case "Apartamento":
                return <PublicarApartamento />;
            case "Casa":
                return <PublicarCasa />;
            case "Chacra":
                return <PublicarChacra />;
            case "Terreno":
                return <PublicarTerreno />;
            case "Local":
                return <PublicarLocal />;
            default:
                return null;
        }
    };

    return (
        <>
            <UserNavbar />
            <div className="publicar-container">
                <h1>Elige el tipo de publicación</h1>
                <div className="cards-container">
                    <div className="card" onClick={handleCardClick}>
                        <h2>Publicación Estándar</h2>
                        <p>Duración: 90 días</p>
                        <p>Visibilidad: Normal</p>
                        <p>Precio: $XX</p>
                    </div>
                    <div className="card" onClick={handleCardClick}>
                        <h2>Publicación Premium</h2>
                        <p>Duración: Sin límite</p>
                        <p>Visibilidad: Destacada</p>
                        <p>Precio: $YY</p>
                    </div>
                </div>

                {mostrarOpciones && (
                    <div className="select-container">
                        <label htmlFor="tipo-propiedad">Selecciona el tipo de propiedad:</label>
                        <select
                            id="tipo-propiedad"
                            onChange={handleSelectChange}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                -- Seleccionar --
                            </option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Casa">Casa</option>
                            <option value="Chacra">Chacra</option>
                            <option value="Terreno">Terreno</option>
                            <option value="Local">Local</option>
                        </select>
                    </div>
                )}

                <div className="componente-seleccionado">
                    {renderComponenteSeleccionado()}
                </div>
            </div>
        </>
    );
};

export default Publicar;

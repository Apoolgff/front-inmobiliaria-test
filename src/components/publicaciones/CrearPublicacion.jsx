import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../services/authContext';
import './CrearPublicacion.css';
import UserNavbar from '../usuarios/UserNavbar'

const CrearPublicacion = () => {
    const { userData } = useAuth();
    const [tipoPublicacion, setTipoPublicacion] = useState(null);
    const [propiedades, setPropiedades] = useState([]);
    const [formValues, setFormValues] = useState({
        propiedad: '',
        tipo: 'venta',
        precio_venta: '',
        tiempo_max_alquiler: '',
        precio_alquiler: { valor: '', periodo: 'mes' },
    });

    // Cargar las propiedades del usuario
    useEffect(() => {
        const fetchPropiedades = async () => {
            if (!userData || !userData._id) return;

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/propiedades/cuenta/${userData._id}`,
                    { withCredentials: true }
                );
                setPropiedades(response.data);
            } catch (error) {
                console.error("Error al cargar las propiedades:", error);
            }
        };

        fetchPropiedades();
    }, [userData?._id]);

    const handleTipoPublicacion = (tipo) => {
        setTipoPublicacion(tipo);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handlePrecioAlquilerChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            precio_alquiler: {
                ...prevValues.precio_alquiler,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Asegúrate de que userData._id esté disponible
        if (!userData || !userData._id) {
            console.error("ID de usuario no disponible en userData.");
            alert("Error: Usuario no autenticado.");
            return;
        }

        const publicacionData = {
            ...formValues,
            tipo_publicacion: tipoPublicacion,
            visibilidad: tipoPublicacion === 'standard' ? 'normal' : 'destacada',
            usuario: userData.userType === 'usuario' ? userData._id : null,
            inmobiliaria: userData.userType === 'inmobiliaria' ? userData._id : null,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/publicacion/cuenta/${userData._id}`,
                publicacionData,
                { withCredentials: true }
            );
            alert('Publicación creada con éxito');
        } catch (error) {
            console.error('Error al crear la publicación:', error);
            alert('Error al crear la publicación');
        }
    };


    return (
        <>
            <UserNavbar />
            <div className="crear-publicacion">
                <h2>Elige un tipo de publicación</h2>
                <div className="cards">
                    <div className="card" onClick={() => handleTipoPublicacion('standard')}>
                        <h3>Publicación Standard</h3>
                        <p>Descripción: Visibilidad normal, duración de 90 días.</p>
                        <p>Precio: $10</p>
                        <button>Seleccionar</button>
                    </div>
                    <div className="card" onClick={() => handleTipoPublicacion('premium')}>
                        <h3>Publicación Premium</h3>
                        <p>Descripción: Visibilidad destacada, duración ilimitada.</p>
                        <p>Precio: $20</p>
                        <button>Seleccionar</button>
                    </div>
                </div>

                {tipoPublicacion && (
                    <form onSubmit={handleSubmit} className="formulario-publicacion">
                        <h3>Detalles de la Publicación ({tipoPublicacion})</h3>
                        <label>
                            Propiedad:
                            <select name="propiedad" value={formValues.propiedad} onChange={handleChange} required>
                                <option value="">Seleccione una propiedad</option>
                                {propiedades.map((prop) => (
                                    <option key={prop._id} value={prop._id}>
                                        {prop.titulo}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Tipo de operación:
                            <div>
                                <input
                                    type="radio"
                                    name="tipo"
                                    value="venta"
                                    checked={formValues.tipo === 'venta'}
                                    onChange={handleChange}
                                />{' '}
                                Venta
                                <input
                                    type="radio"
                                    name="tipo"
                                    value="alquiler"
                                    checked={formValues.tipo === 'alquiler'}
                                    onChange={handleChange}
                                />{' '}
                                Alquiler
                            </div>
                        </label>

                        {formValues.tipo === 'venta' && (
                            <label>
                                Precio de Venta:
                                <input
                                    type="number"
                                    name="precio_venta"
                                    value={formValues.precio_venta}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        )}

                        {formValues.tipo === 'alquiler' && (
                            <>
                                <label>
                                    Tiempo Máximo de Alquiler:
                                    <input
                                        type="number"
                                        name="tiempo_max_alquiler"
                                        value={formValues.tiempo_max_alquiler}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Precio de Alquiler:
                                    <input
                                        type="number"
                                        name="valor"
                                        value={formValues.precio_alquiler.valor}
                                        onChange={handlePrecioAlquilerChange}
                                        required
                                    />
                                    <select
                                        name="periodo"
                                        value={formValues.precio_alquiler.periodo}
                                        onChange={handlePrecioAlquilerChange}
                                        required
                                    >
                                        <option value="día">Día</option>
                                        <option value="mes">Mes</option>
                                        <option value="año">Año</option>
                                    </select>
                                </label>
                            </>
                        )}

                        <button type="submit" className="boton-publicar">Publicar</button>
                    </form>
                )}
            </div>
        </>
    );
};

export default CrearPublicacion;

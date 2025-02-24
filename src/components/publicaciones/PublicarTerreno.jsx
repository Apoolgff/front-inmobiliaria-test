import React, { useState, useEffect } from 'react'; // Importar useEffect
import axios from 'axios';
import { useAuth } from '../../services/authContext';
import { estadoInicialTerreno } from './constants/EstadosIniciales'; // Importar el estado inicial

const PublicarTerreno = () => {
    const { userData } = useAuth();
    const [publicacion, setPublicacion] = useState(estadoInicialTerreno); // Usar el estado inicial
    const [expandedSection, setExpandedSection] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Actualizar el estado inicial con el tipo de usuario
    useEffect(() => {
        if (userData?.tipo) {
            setPublicacion((prev) => ({
                ...prev,
                propietarioTipo: userData.tipo, // Asignar el tipo de usuario
                propietario: userData._id, // Asignar el ID del usuario como propietario
            }));
        }
    }, [userData]); // Dependencia: userData

    const flattenObject = (obj, prefix = '') => {
        return Object.keys(obj).reduce((acc, key) => {
            const prefixedKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                Object.assign(acc, flattenObject(obj[key], prefixedKey));
            } else {
                acc[prefixedKey] = obj[key];
            }
            return acc;
        }, {});
    };

    const toggleSection = (section) => {
        setExpandedSection((prev) => (prev === section ? '' : section));
    };

    const handleChange = (e, category) => {
        const { name, value } = e.target;
        if (category) {
            setPublicacion((prev) => ({
                ...prev,
                [category]: { ...prev[category], [name]: value }
            }));
        } else {
            setPublicacion({ ...publicacion, [name]: value });
        }
    };

    const handleFotoChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newFotos = Array.from(files).map((file) => ({
                file,
                descripcion: ''
            }));
            setPublicacion((prev) => ({
                ...prev,
                fotos: newFotos
            }));
        } else {
            setPublicacion((prev) => ({
                ...prev,
                fotos: []
            }));
        }
    };

    const handleDescripcionChange = (e, index) => {
        const { value } = e.target;
        setPublicacion((prev) => {
            const updatedFotos = [...prev.fotos];
            updatedFotos[index].descripcion = value;
            return { ...prev, fotos: updatedFotos };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        const flattenedData = flattenObject(publicacion);
        for (const [key, value] of Object.entries(flattenedData)) {
            formData.append(key, value);
        }

        publicacion.fotos.forEach((foto, index) => {
            if (foto.file) {
                formData.append('fotos', foto.file);
                if (foto.descripcion) {
                    formData.append(`fotoDescripcion[${index}]`, foto.descripcion);
                }
            }
        });

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/publicacion/cuenta/${userData._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                setSuccess('Publicación agregada con éxito');
            }
        } catch (error) {
            setError('Hubo un error al crear la publicación. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleRadioChange = (e) => {
        const { value } = e.target;
        if (value === 'venta') {
            setPublicacion({
                ...publicacion,
                enVenta: true,
                enAlquiler: false,
            });
        } else if (value === 'alquiler') {
            setPublicacion({
                ...publicacion,
                enVenta: false,
                enAlquiler: true,
            });
        }
    };

    return (
        <>
            <form className="crear-publicacion" onSubmit={handleSubmit}>
                <div>
                    <h2 onClick={() => toggleSection('general')}>Información General</h2>
                    {expandedSection === 'general' && (
                        <>
                            <input type="text" name="tipo" placeholder="Tipo" value={publicacion.tipo} onChange={handleChange} />
                            <input type="text" name="id" placeholder="ID único" value={publicacion.id} onChange={handleChange} />
                            <input type="text" name="titulo" placeholder="Título" value={publicacion.titulo} onChange={handleChange} />
                            <textarea name="descripcion" placeholder="Descripción" value={publicacion.descripcion} onChange={handleChange} />
                        </>
                    )}
                </div>

                <div>
                    <h2 onClick={() => toggleSection('ubicacion')}>Ubicación</h2>
                    {expandedSection === 'ubicacion' &&
                        Object.keys(publicacion.Ubicacion).map((key) => (
                            <input
                                key={key}
                                type="text"
                                name={key}
                                placeholder={key}
                                value={publicacion.Ubicacion[key]}
                                onChange={(e) => handleChange(e, 'Ubicacion')}
                            />
                        ))}
                </div>

                <div>
                    <h2 onClick={() => toggleSection('caracteristicas')}>Características</h2>
                    {expandedSection === 'caracteristicas' &&
                        Object.keys(publicacion.Caracteristicas).map((key) => (
                            <input
                                key={key}
                                type="text"
                                name={key}
                                placeholder={key}
                                value={publicacion.Caracteristicas[key]}
                                onChange={(e) => handleChange(e, 'Caracteristicas')}
                            />
                        ))}
                </div>

                <div>
                    <h2 onClick={() => toggleSection('venta-alquiler')}>Venta o Alquiler</h2>
                    {expandedSection === 'venta-alquiler' && (
                        <div className="radio-buttons">
                            <label>
                                <input
                                    type="radio"
                                    name="venta-alquiler"
                                    value="venta"
                                    checked={publicacion.enVenta}
                                    onChange={handleRadioChange}
                                />
                                Venta
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="venta-alquiler"
                                    value="alquiler"
                                    checked={publicacion.enAlquiler}
                                    onChange={handleRadioChange}
                                />
                                Alquiler
                            </label>
                        </div>
                    )}
                </div>

                {publicacion.enVenta && (
                    <div>
                        <h2 onClick={() => toggleSection('venta')}>Venta</h2>
                        {expandedSection === 'venta' &&
                            Object.keys(publicacion.venta).map((key) => (
                                <input
                                    key={key}
                                    type="text"
                                    name={key}
                                    placeholder={key}
                                    value={publicacion.venta[key]}
                                    onChange={(e) => handleChange(e, 'venta')}
                                />
                            ))}
                    </div>
                )}

                {publicacion.enAlquiler && (
                    <div>
                        <h2 onClick={() => toggleSection('alquiler')}>Alquiler</h2>
                        {expandedSection === 'alquiler' &&
                            Object.keys(publicacion.alquiler).map((key) => (
                                <input
                                    key={key}
                                    type="text"
                                    name={key}
                                    placeholder={key}
                                    value={publicacion.alquiler[key]}
                                    onChange={(e) => handleChange(e, 'alquiler')}
                                />
                            ))}
                    </div>
                )}

                <div>
                    <h2 onClick={() => toggleSection('fotos')}>Fotos</h2>
                    {expandedSection === 'fotos' && (
                        <>
                            <input
                                type="file"
                                name="fotos"
                                multiple
                                onChange={handleFotoChange}
                            />
                            {publicacion.fotos.map((foto, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        name="descripcion"
                                        placeholder="Descripción de la foto"
                                        value={foto.descripcion}
                                        onChange={(e) => handleDescripcionChange(e, index)}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <button type="submit">Crear Publicacion</button>
            </form>

            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </>
    );
};

export default PublicarTerreno;
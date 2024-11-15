import React, { useState } from 'react';
import axios from 'axios';
import '../propiedades/CrearPropiedad.css';
import { useAuth } from '../../services/authContext';

const PublicarLocal = () => {
    const { userData } = useAuth();
    const [propiedad, setPropiedad] = useState({
        propietario: '',
        propietarioTipo: 'Usuarios',
        tipo: 'Local',
        id: '',
        inmobiliaria: '',
        broker: '',
        enVenta: false,
        enAlquiler: false,
        titulo: '',
        descripcion: '',
        destacada: false,
        url: '',
        Ubicacion: {
            departamento: '',
            ciudad: '',
            barrio: '',
            distanciamarmetros: '',
            frentealmar: '',
            direccion: '',
            lat: '',
            lon: ''
        },
        Caracteristicas: {
            fechamodificado: "",
            vista: "",
            distanciamarmetros: "",
            frentealmar: "",
            superficie: "",
            superficiecubierta: "",
            superficiesemicubierta: "",
            frente: "",
            fondo: "",
            metrosentrepiso: "",
            metrossubsuelo: "",
            banos: "",
            ubicacion: "",
            idealpara: "",
            tenencia: "",
            monedacontribucion: "",
            contribucioninmobiliaria: "",
            monedaprimaria: "",
            impuestoprimaria: "",
            gastoscomunes: "",
            monedagastos: "",
            frecuenciagastos: "",
            tipo: "",
            youtube: "",
            matterport: ""
        },
        venta: {
            precio: '',
            mda: '',
            fechavigencia: '',
            permuta: '',
            oferta: '',
            financia: '',
            renta: '',
            porcentajerenta: '',
            saldobanco: ''
        },
        alquiler: {
            VigenciaAlquiler: '',
            PrecioPubliacionAlquiler: '',
            Febrero: '',
            FebreroQuincena1: '',
            FebreroQuincena2: '',
            CotizacionDolar: '',
            AceptaMascota: ''
        },
        fotos: []
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e, category) => {
        const { name, value } = e.target;
        if (category) {
            setPropiedad((prev) => ({
                ...prev,
                [category]: { ...prev[category], [name]: value }
            }));
        } else {
            setPropiedad({ ...propiedad, [name]: value });
        }
    };

    const handleFotoChange = (e, index) => {
        const { name, value } = e.target;
        const newFotos = [...propiedad.fotos];
        newFotos[index] = { ...newFotos[index], [name]: value };
        setPropiedad({ ...propiedad, fotos: newFotos });
    };

    const addFoto = () => {
        setPropiedad({ ...propiedad, fotos: [...propiedad.fotos, { url: '', descripcion: '' }] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/propiedades/usuario/${userData._id}`, propiedad, {
                withCredentials: true,
            });
            if (response.status === 201) {
                setSuccess('Propiedad agregada con éxito');
            }
        } catch (error) {
            setError('Hubo un error al crear la propiedad. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form className="crear-propiedad" onSubmit={handleSubmit}>
                <h2>Información General</h2>
                <input type="text" name="tipo" placeholder="Tipo" value={propiedad.tipo} onChange={handleChange} />
                <input type="text" name="id" placeholder="ID único" value={propiedad.id} onChange={handleChange} />
                <input type="text" name="titulo" placeholder="Título" value={propiedad.titulo} onChange={handleChange} />
                <textarea name="descripcion" placeholder="Descripción" value={propiedad.descripcion} onChange={handleChange} />

                <h2>Ubicación</h2>
                {Object.keys(propiedad.Ubicacion).map((key) => (
                    <input
                        key={key}
                        type="text"
                        name={key}
                        placeholder={key}
                        value={propiedad.Ubicacion[key]}
                        onChange={(e) => handleChange(e, 'Ubicacion')}
                    />
                ))}

                <h2>Características</h2>
                {Object.keys(propiedad.Caracteristicas).map((key) => (
                    <input
                        key={key}
                        type="text"
                        name={key}
                        placeholder={key}
                        value={propiedad.Caracteristicas[key]}
                        onChange={(e) => handleChange(e, 'Caracteristicas')}
                    />
                ))}

                <h2>Venta</h2>
                {Object.keys(propiedad.venta).map((key) => (
                    <input
                        key={key}
                        type="text"
                        name={key}
                        placeholder={key}
                        value={propiedad.venta[key]}
                        onChange={(e) => handleChange(e, 'venta')}
                    />
                ))}

                <h2>Alquiler</h2>
                {Object.keys(propiedad.alquiler).map((key) => (
                    <input
                        key={key}
                        type="text"
                        name={key}
                        placeholder={key}
                        value={propiedad.alquiler[key]}
                        onChange={(e) => handleChange(e, 'alquiler')}
                    />
                ))}

                <h2>Fotos</h2>
                {propiedad.fotos.map((foto, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="url"
                            placeholder="URL de la foto"
                            value={foto.url}
                            onChange={(e) => handleFotoChange(e, index)}
                        />
                        <input
                            type="text"
                            name="descripcion"
                            placeholder="Descripción de la foto"
                            value={foto.descripcion}
                            onChange={(e) => handleFotoChange(e, index)}
                        />
                    </div>
                ))}
                <button type="button" onClick={addFoto}>Añadir otra foto</button>

                <button type="submit">Crear Propiedad</button>
            </form>

            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </>
    );
};

export default PublicarLocal;
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../services/authContext';

const PublicarCasa = () => {
    const { userData } = useAuth();
    const [publicacion, setPublicacion] = useState({
        propietario: '',
        propietarioTipo: 'Usuarios',
        tipo: 'Casa',
        id: null,
        inmobiliaria: null,
        broker: null,
        enVenta: false,  // Por defecto, no está en venta
        enAlquiler: false, // Por defecto, no está en alquiler
        titulo: null,
        descripcion: null,
        destacada: false,
        url: null,
        Ubicacion: {
            departamento: null,
            ciudad: null,
            barrio: null,
            distanciamarmetros: null,
            frentealmar: null,
            direccion: null,
            lat: null,
            lon: null
        },
        Caracteristicas: {
            vista: null,
            tipocasa: null,
            orientacion: null,
            disposicion: null,
            frentealmar: null,
            distanciamarmetros: null,
            superficieterreno: null,
            superficieedificado: null,
            superficiecubierta: null,
            superficiesemicubierta: null,
            frente: null,
            fondo: null,
            tenencia: null,
            totaldormitorios: null,
            banos: null,
            suites: null,
            toilettes: null,
            cocina: null,
            living: null,
            comedor: null,
            livingcomedor: null,
            comedordiario: null,
            capacidadpersonas: null,
            cantidadcamas: null,
            dependenciaservicio: null,
            equipamiento: null,
            caracteristicas: null,
            comodidades: null,
            banoservicio: null,
            playroom: null,
            propiedadhorizonal: null,
            estufalena: null,
            cochera: null,
            calefaccion: null,
            garage: null,
            estacionamiento: null,
            estado: null,
            cantidadplantas: null,
            paredes: null,
            pisos: null,
            techo: null,
            saneamiento: null,
            piscina: null,
            parrillero: null,
            fechaconstruccion: null,
            muebles: null,
            amoblado: null,
            amovred: null,
            lavadero: null,
            monedacontribucion: null,
            contribucioninmobiliaria: null,
            frecuenciacontribucion: null,
            monedaprimaria: null,
            impuestoprimaria: null,
            frecuenciaprimaria: null,
            gastoscomunes: null,
            monedagastos: null,
            frecuenciagastos: null,
            alarma: null,
            youtube: null,
            matterport: null
        },
        venta: {
            precio: null,
            mda: null,
            fechavigencia: null,
            permuta: null,
            oferta: null,
            financia: null,
            renta: null,
            porcentajerenta: null,
            saldobanco: null
        },
        alquiler: {
            VigenciaAlquiler: null,
            PrecioPubliacionAlquiler: null,
            Enero: null,
            EneroQuincena1: null,
            EneroQuincena2: null,
            Febrero: null,
            FebreroQuincena1: null,
            FebreroQuincena2: null,
            Reveion: null,
            Carnaval: null,
            SemanaSanta: null,
            AnualPesos: null,
            InvernalPesos: null,
            AnualDolares: null,
            PeriodoPrecioAlqAnual: null,
            AnualTestigo: null, // o string o number
            CotizacionDolar: null,
            InvernalDolares: null,
            Diciembre: null,
            DiciembreQuincena1: null,
            DiciembreQuincena2: null,
            Marzo: null,
            MarzoQuincena1: null,
            MarzoQuincena2: null,
            Temporada: null,
            AceptaMascota: false,
            AceptaFumador: false,
            AceptaNinos: false,
            GDeposito: false,
            GPropiedad: false,
            GAnda: false,
            GPorto: false,
            GCGN: false,
            GMVOTMA: false,
            GSura: false,
            GLUC: false,
            GCIncluidos: false
        },
        fotos: [{url: null, descripcion: null}] // Cambiado a un arreglo de archivos
    });

    const [expandedSection, setExpandedSection] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
        const files = e.target.files; // Obtener los archivos seleccionados
        if (files && files.length > 0) {
            const newFotos = Array.from(files).map((file) => ({
                file, // Guardamos el archivo de la foto
                descripcion: '' // Inicializamos una descripción vacía
            }));
            setPublicacion((prev) => ({
                ...prev,
                fotos: newFotos // Establecemos el nuevo estado con las fotos y descripciones vacías
            }));
        } else {
            setPublicacion((prev) => ({
                ...prev,
                fotos: [] // Asegurarnos de que fotos esté vacío si no hay archivos
            }));
        }
    };

    const handleDescripcionChange = (e, index) => {
        const { value } = e.target;
        setPublicacion((prev) => {
            const updatedFotos = [...prev.fotos];
            updatedFotos[index].descripcion = value; // Actualizamos la descripción de la foto en la posición correspondiente
            return { ...prev, fotos: updatedFotos };
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
    
        const formData = new FormData();
    
        // Aplanar datos de la publicación y agregarlos a FormData
        const flattenedData = flattenObject(publicacion);
        for (const [key, value] of Object.entries(flattenedData)) {
            formData.append(key, value);
        }
    
        // Agregar fotos al FormData
        publicacion.fotos.forEach((foto, index) => {
            if (foto.file) {
                formData.append('fotos', foto.file); // Añadir archivo
                if (foto.descripcion) {
                    formData.append(`fotoDescripcion[${index}]`, foto.descripcion); // Descripción de la foto
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

                {/* Mostrar el título "Venta o Alquiler" y los radio buttons */}
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

                {/* Mostrar inputs de Venta si enVenta */}
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

                {/* Mostrar inputs de Alquiler si enAlquiler */}
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

export default PublicarCasa;

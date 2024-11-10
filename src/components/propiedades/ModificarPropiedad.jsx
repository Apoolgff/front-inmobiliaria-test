import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from '../usuarios/UserNavbar';
import './ModificarPropiedad.css';

const ModificarPropiedad = () => {
    const { id } = useParams(); // Obtener el id de la propiedad
    const navigate = useNavigate();
    const [propiedad, setPropiedad] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({}); // Almacenar cambios en el formulario

    useEffect(() => {
        if (!id) {
            setError('ID no proporcionado');
            setLoading(false);
            return;
        }

        const fetchPropiedad = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/propiedades/${id}`
                );
                setPropiedad(response.data);
                setFormData(response.data); // Inicializar formData con los datos de la propiedad
            } catch (error) {
                setError('Error al cargar la propiedad');
            } finally {
                setLoading(false);
            }
        };

        fetchPropiedad();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const keys = name.split(".");
            let updatedData = { ...prevData };
            let nestedData = updatedData;

            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                nestedData[key] = nestedData[key] || {};
                nestedData = nestedData[key];
            }

            nestedData[keys[keys.length - 1]] = value;
            return updatedData;
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/propiedades/${id}`,
                formData,
                { withCredentials: true }
            );
            alert('Propiedad actualizada con éxito');
            navigate('/ver-propiedades'); // Redirigir a la lista de propiedades
        } catch (error) {
            console.error('Error al actualizar propiedad:', error);
            alert('Error al actualizar propiedad');
        }
    };

    if (loading) return <p>Cargando propiedad...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <UserNavbar />
            <div className="modificar-propiedad">
                <h2>Modificar Propiedad</h2>
                <form>
                    <div className="campo">
                        <label>Título:</label>
                        <input
                            type="text"
                            name="titulo"
                            value={formData.titulo || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="campo">
                        <label>Tipo:</label>
                        <input
                            type="text"
                            name="tipo"
                            value={formData.tipo || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="campo">
                        <label>Descripción:</label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <h3>Venta</h3>
                    <div className="campo">
                        <label>Precio de Venta:</label>
                        <input
                            type="number"
                            name="venta.precio"
                            value={formData.venta?.precio || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Moneda:</label>
                        <input
                            type="text"
                            name="venta.mda"
                            value={formData.venta?.mda || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Fecha de Vigencia:</label>
                        <input
                            type="date"
                            name="venta.fechaVigencia"
                            value={formData.venta?.fechaVigencia || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Permuta:</label>
                        <input
                            type="text"
                            name="venta.permuta"
                            value={formData.venta?.permuta || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>oferta:</label>
                        <input
                            type="text"
                            name="venta.oferta"
                            value={formData.venta?.oferta || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Financiacion:</label>
                        <input
                            type="text"
                            name="venta.financiacion"
                            value={formData.venta?.financiacion || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Renta:</label>
                        <input
                            type="number"
                            name="venta.renta"
                            value={formData.venta?.renta || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Porcentaje Renta:</label>
                        <input
                            type="number"
                            name="venta.porcentajerenta"
                            value={formData.venta?.porcentajerenta || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Saldo Banco:</label>
                        <input
                            type="number"
                            name="venta.saldobanco"
                            value={formData.venta?.saldobanco || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* Repite la misma estructura para cada campo dentro de "venta" */}

                    <h3>Ubicación</h3>
                    <div className="campo">
                        <label>Departamento:</label>
                        <input
                            type="text"
                            name="Ubicacion.departamento"
                            value={formData.Ubicacion?.departamento || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Ciudad:</label>
                        <input
                            type="text"
                            name="Ubicacion.ciudad"
                            value={formData.Ubicacion?.ciudad || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Barrio:</label>
                        <input
                            type="text"
                            name="Ubicacion.barrio"
                            value={formData.Ubicacion?.barrio || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Distancia del mar:</label>
                        <input
                            type="number"
                            name="Ubicacion.distanciamarmetros"
                            value={formData.Ubicacion?.distanciamarmetros || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Frente al mar:</label>
                        <input
                            type="text"
                            name="Ubicacion.frentealmar"
                            value={formData.Ubicacion?.frentealmar || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Direccion:</label>
                        <input
                            type="text"
                            name="Ubicacion.direccion"
                            value={formData.Ubicacion?.direccion || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Lat:</label>
                        <input
                            type="number"
                            name="Ubicacion.lat"
                            value={formData.Ubicacion?.lat || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Lon:</label>
                        <input
                            type="number"
                            name="Ubicacion.lon"
                            value={formData.Ubicacion?.lon || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* Repite la misma estructura para cada campo dentro de "Ubicacion" */}

                    <h3>Características</h3>
                    <div className="campo">
                        <label>Parrillero:</label>
                        <input
                            type="text"
                            name="Caracteristicas.parrillero"
                            value={formData.Caracteristicas?.parrillero || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Playroom:</label>
                        <input
                            type="text"
                            name="Caracteristicas.playroom"
                            value={formData.Caracteristicas?.playroom || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Mucamas:</label>
                        <input
                            type="text"
                            name="Caracteristicas.mucamas"
                            value={formData.Caracteristicas?.mucamas || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Servicio playa:</label>
                        <input
                            type="text"
                            name="Caracteristicas.servicioplaya"
                            value={formData.Caracteristicas?.servicioplaya || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Tipo de Edificio:</label>
                        <input
                            type="text"
                            name="Caracteristicas.tipoedificio"
                            value={formData.Caracteristicas?.tipoedificio || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Asensores:</label>
                        <input
                            type="number"
                            name="Caracteristicas.asensores"
                            value={formData.Caracteristicas?.asensores || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Piscina:</label>
                        <input
                            type="text"
                            name="Caracteristicas.piscina"
                            value={formData.Caracteristicas?.piscina || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Estacionamiento visitas:</label>
                        <input
                            type="text"
                            name="Caracteristicas.estacionamientovisitas"
                            value={formData.Caracteristicas?.estacionamientovisitas || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Sauna:</label>
                        <input
                            type="text"
                            name="Caracteristicas.sauna"
                            value={formData.Caracteristicas?.sauna || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Gimnacio:</label>
                        <input
                            type="text"
                            name="Caracteristicas.gimnacio"
                            value={formData.Caracteristicas?.gimnacio || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Total de Dormitorios:</label>
                        <input
                            type="number"
                            name="Caracteristicas.totaldormitorios"
                            value={formData.Caracteristicas?.totaldormitorios || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Baños:</label>
                        <input
                            type="number"
                            name="Caracteristicas.banos"
                            value={formData.Caracteristicas?.banos || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Suites:</label>
                        <input
                            type="number"
                            name="Caracteristicas.suites"
                            value={formData.Caracteristicas?.suites || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Cocina:</label>
                        <input
                            type="text"
                            name="Caracteristicas.cocina"
                            value={formData.Caracteristicas?.cocina || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Capacidad de Personas:</label>
                        <input
                            type="number"
                            name="Caracteristicas.capacidadpersonas"
                            value={formData.Caracteristicas?.capacidadpersonas || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Cantidad de Camas:</label>
                        <input
                            type="number"
                            name="Caracteristicas.cantidadcamas"
                            value={formData.Caracteristicas?.cantidadcamas || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Equipamiento:</label>
                        <input
                            type="text"
                            name="Caracteristicas.equipamiento"
                            value={formData.Caracteristicas?.equipamiento || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Amenities:</label>
                        <input
                            type="text"
                            name="Caracteristicas.amenities"
                            value={formData.Caracteristicas?.amenities || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Gastos Comunes:</label>
                        <input
                            type="number"
                            name="Caracteristicas.gastoscomunes"
                            value={formData.Caracteristicas?.gastoscomunes || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Moneda Gastos:</label>
                        <input
                            type="text"
                            name="Caracteristicas.monedagastos"
                            value={formData.Caracteristicas?.monedagastos || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Frecuencia de Gastos:</label>
                        <input
                            type="text"
                            name="Caracteristicas.frecuenciagastos"
                            value={formData.Caracteristicas?.frecuenciagastos || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Antiguedad:</label>
                        <input
                            type="number"
                            name="Caracteristicas.antiguedad"
                            value={formData.Caracteristicas?.antiguedad || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Cochera:</label>
                        <input
                            type="text"
                            name="Caracteristicas.cochera"
                            value={formData.Caracteristicas?.cochera || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Superficie Propia:</label>
                        <input
                            type="number"
                            name="Caracteristicas.superficiepropia"
                            value={formData.Caracteristicas?.superficiepropia || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Terraza/Balcon:</label>
                        <input
                            type="text"
                            name="Caracteristicas.terrazabalcon"
                            value={formData.Caracteristicas?.terrazabalcon || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Vista:</label>
                        <input
                            type="text"
                            name="Caracteristicas.vista"
                            value={formData.Caracteristicas?.vista || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* Repite la misma estructura para cada campo dentro de "Caracteristicas" */}

                    <h3>Alquiler</h3>
                    <div className="campo">
                        <label>Vigencia de Alquiler:</label>
                        <input
                            type="text"
                            name="Caracteristicas.VigenciaAlquiler"
                            value={formData.Caracteristicas?.VigenciaAlquiler || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Precio Publicación de Alquiler:</label>
                        <input
                            type="number"
                            name="Caracteristicas.PrecioPublicacionAlquiler"
                            value={formData.Caracteristicas?.PrecioPublicacionAlquiler || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Cotizacion del Dolar:</label>
                        <input
                            type="number"
                            name="Caracteristicas.CotizacionDolar"
                            value={formData.Caracteristicas?.CotizacionDolar || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label>Acepta Mascotas:</label>
                        <input
                            type="text"
                            name="Caracteristicas.AceptaMascota"
                            value={formData.Caracteristicas?.AceptaMascota || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* Repite la misma estructura para cada campo dentro de "Alquiler" */}

                    <button type="button" onClick={handleUpdate}>
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </>
    );
};

export default ModificarPropiedad;

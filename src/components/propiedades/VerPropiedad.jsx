import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from '../Navegadores/UserNavbar'
import './VerPropiedad.css'

const VerPropiedad = () => {
    const { id } = useParams(); // Obtener el id de la propiedad
    const [propiedad, setPropiedad] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            } catch (error) {
                setError('Error al cargar la propiedad');
            } finally {
                setLoading(false);
            }
        };

        fetchPropiedad();
    }, [id]);

    if (loading) return <p>Cargando propiedad...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <UserNavbar />
            <div className='ver-propiedad'>
                <h2>{propiedad.titulo}</h2>
                <p><span>Tipo: </span>{propiedad.tipo}</p>
                <p><span>Descripcion: </span>{propiedad.descripcion}</p>

                <h3>venta</h3>
                <p><span>Precio de Venta:</span> {propiedad.venta.precio}$</p>
                <p><span>Moneda: </span>{propiedad.venta.mda}</p>
                <p><span>Fecha de Vigencia: </span>{propiedad.venta.fechaVigencia}</p>
                <p><span>Permuta: </span>{propiedad.venta.permuta}</p>
                <p><span>Oferta: </span>{propiedad.venta.oferta}</p>
                <p><span>Financiacion: </span>{propiedad.venta.financia}</p>
                <p><span>Renta: </span>{propiedad.venta.renta}</p>
                <p><span>Porcentaje Renta: </span>{propiedad.venta.porcentajerenta}</p>
                <p><span>Saldo de Banco: </span>{propiedad.venta.saldobanco}</p>
                

                <h3>Ubicacion</h3>
                <p><span>Departamento: </span>{propiedad.Ubicacion.departamento}</p>
                <p><span>Ciudad: </span>{propiedad.Ubicacion.ciudad}</p>
                <p><span>Barrio: </span>{propiedad.Ubicacion.barrio}</p>
                <p><span>Distancia del mar (metros): </span>{propiedad.Ubicacion.distanciamarmetros}</p>
                <p><span>Frente al mar: </span>{propiedad.Ubicacion.frentealmar}</p>
                <p><span>direccion: </span>{propiedad.Ubicacion.direccion}</p>
                <p><span>lat: </span>{propiedad.Ubicacion.lat}</p>
                <p><span>lon: </span>{propiedad.Ubicacion.lon}</p>

                <h3>Caracteristicas</h3>
                <p><span>Parrillero: </span>{propiedad.Caracteristicas.parrillero}</p>
                <p><span>Playroom: </span>{propiedad.Caracteristicas.playroom}</p>
                <p><span>mucamas: </span>{propiedad.Caracteristicas.mucamas}</p>
                <p><span>Servicio playa:</span> {propiedad.Caracteristicas.servicioplaya}</p>
                <p><span>Tipo de edificio: </span>{propiedad.Caracteristicas.tipoedificio}</p>
                <p><span>Asensores: </span>{propiedad.Caracteristicas.asensores}</p>
                <p><span>Piscina: </span>{propiedad.Caracteristicas.piscina}</p>
                <p><span>Estacionamiento visitas: </span>{propiedad.Caracteristicas.estacionamientovisitas}</p>
                <p><span>Sauna: </span>{propiedad.Caracteristicas.sauna}</p>
                <p><span>Gimnacio: </span>{propiedad.Caracteristicas.gimnacio}</p>
                <p><span>Dormitorios: </span>{propiedad.Caracteristicas.totaldormitorios}</p>
                <p><span>Baños: </span>{propiedad.Caracteristicas.banos}</p>
                <p><span>Suites: </span>{propiedad.Caracteristicas.suites}</p>
                <p><span>Cocina: </span>{propiedad.Caracteristicas.cocina}</p>
                <p><span>Capacidad de personas: </span>{propiedad.Caracteristicas.capacidadpersonas}</p>
                <p><span>Cantidad de camas: </span>{propiedad.Caracteristicas.cantidadcamas}</p>
                <p><span>Equipamiento: </span>{propiedad.Caracteristicas.equipamiento}</p>
                <p><span>Amenities: </span>{propiedad.Caracteristicas.amenities}</p>
                <p><span>Gastos comunes: </span>{propiedad.Caracteristicas.gastoscomunes}</p>
                <p><span>Moneda de gastos: </span>{propiedad.Caracteristicas.monedagastos}</p>
                <p><span>Frecuencia de gastos: </span>{propiedad.Caracteristicas.frecuenciagastos}</p>
                <p><span>Antiguedad: </span>{propiedad.Caracteristicas.antiguedad}</p>
                <p><span>Cochera: </span>{propiedad.Caracteristicas.cochera}</p>
                <p><span>Superficie propia: </span>{propiedad.Caracteristicas.superficiepropia}</p>
                <p><span>Terraza/Balcon:</span> {propiedad.Caracteristicas.terrazabalcon}</p>
                <p><span>Vista:</span> {propiedad.Caracteristicas.vista}</p>

                <h3>Alquiler</h3>
                <p><span>Vigencia de alquiler: </span>{propiedad.Caracteristicas.VigenciaAlquiler}</p>
                <p><span>Precio publicacion de alquiler:</span> {propiedad.Caracteristicas.PrecioPublicacionAlquiler}</p>
                <p><span>Febrero? dato raro crm: </span>{propiedad.Caracteristicas.Febrero}</p>
                <p><span>1ra Quincena:</span> {propiedad.Caracteristicas.FebreroQuincena1}</p>
                <p><span>2da Quincena: </span>{propiedad.Caracteristicas.FebreroQuincena2}</p>
                <p><span>Cotizacion dolar:</span> {propiedad.Caracteristicas.CotizacionDolar}</p>
                <p><span>Acepta mascotas: </span>{propiedad.Caracteristicas.AceptaMascota}</p>
                {/* Aquí puedes agregar más detalles */}
            </div>
        </>
    );
};

export default VerPropiedad;

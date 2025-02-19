import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './VerPublicacion.css';
import Navbar from '../Navbar';
import UserNavbar from '../usuarios/UserNavbar';  // Importar UserNavbar
import { useAuth } from '../../services/authContext';  // Importar el hook useAuth
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const VerPublicacion = () => {
    const { pid } = useParams(); // Obtiene el parámetro de la URL
    const { isAuthenticated } = useAuth(); // Obtenemos el estado de autenticación
    const [publicacion, setPublicacion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublicacion = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/publicacion/${pid}`);
                setPublicacion(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Error al cargar la publicación');
                setLoading(false);
            }
        };

        fetchPublicacion();
    }, [pid]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            {/* Muestra el Navbar dependiendo de la autenticación */}
            {isAuthenticated ? <UserNavbar /> : <Navbar />}

            <section className="ver-publicacion">
                <article className='ver-article'>
                
                <div className='ver-swiper'>
                <Swiper 
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    
                >
                    {(publicacion.fotos?.length > 0 ? publicacion.fotos : [{ url: "/public/images/casa-1.png" }]).map((foto, index) => (
                        <SwiperSlide key={index}>
                            <img src={foto.url} alt={`Imagen ${index + 1}`} className="slider-image" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                </div>
                <div className='ver-descripcion'>
                    <div className = "ver-encabezado">
                        <h2 className='ver-titulo'>{publicacion.titulo}</h2>
                        <p  >${publicacion.precio || 0} </p>
                    </div>
                    <p className='ver-ubicacion'>{publicacion.Ubicacion.departamento}, {publicacion.Ubicacion.ciudad}, {publicacion.Ubicacion.barrio}</p>
                    <div className='ver-detalles'>
                        <p>{publicacion.tipo} en {publicacion.Caracteristicas.estado}. Fecha de construccion {publicacion.Caracteristicas.fechaconstruccion}</p>
                        <p>{publicacion.Caracteristicas.disposicion}, 
                            {publicacion.Caracteristicas.plantas} plantas, {publicacion.Caracteristicas.totaldormitorios} dormitorios, {publicacion.Caracteristicas.banos} baños
                        </p>
                        <p>
                            {publicacion.Caracteristicas.superficieedificado}m2 edificados, {publicacion.Caracteristicas.superficiecubierta}m2 del terreno
                        </p>
                    </div>
                    <h3 className='ver-descripcion_titulo' >Descripcion</h3>
                    <div className='ver-descripcion_linea'></div>
                    <p>{publicacion.descripcion}</p>
                </div>
                <div className="ver-caracteristicas">
                    
                    {publicacion.Caracteristicas && Object.entries(publicacion.Caracteristicas)
                        .filter(([key, value]) =>
                            key !== '_id' && value !== null && value !== undefined && value !== ''
                        )
                        .map(([key, value]) => (
                            <div className='ver-caracteristicas_item' key={key}>
                                <img className='ver-imagenes' src={`/icons/${key}.png`} alt="" />
                            <p className='ver-caracteristicas_texto'>
                                {key}: {value.toString()}
                            </p>
                            </div>
                        ))
                    }
                </div>
                </article>
            </section>
        </>
    );
};

export default VerPublicacion;

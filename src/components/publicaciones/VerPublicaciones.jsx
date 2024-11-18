import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import UserNavbar from '../usuarios/UserNavbar';
import { useAuth } from '../../services/authContext';
import './VerPublicaciones.css';
import { Link } from 'react-router-dom';

const VerPublicaciones = () => {
  const { isAuthenticated } = useAuth(); // Obtenemos el estado de autenticación
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get('http://localhost:4000/publicacion');
        setPublicaciones(response.data); // Asumimos que el backend devuelve un arreglo de publicaciones
      } catch (err) {
        setError('Error al cargar las publicaciones');
      } finally {
        setLoading(false);
      }
    };
    fetchPublicaciones();
  }, []);

  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Navbar depende del estado de autenticación */}
      {isAuthenticated ? <UserNavbar /> : <Navbar />}

      <div className="publicaciones-container">
        {publicaciones.length > 0 ? (
          publicaciones.map((publicacion) => (
            <div className="publicacion-card" key={publicacion.id}>
              <div className="publicacion-header">
                <h3>{publicacion.titulo || 'Sin título'}</h3>
              </div>
              <div className="publicacion-body">
                <p><strong>Descripción:</strong> {publicacion.descripcion || 'No disponible'}</p>
                {publicacion.Ubicacion && (
                  <p>
                    <strong>Ubicación:</strong>
                    {publicacion.Ubicacion.ciudad}, {publicacion.Ubicacion.departamento}
                  </p>
                )}
                <p>
                  <strong>En venta:</strong> {publicacion.enVenta ? 'Sí' : 'No'} <br />
                  <strong>En alquiler:</strong> {publicacion.enAlquiler ? 'Sí' : 'No'}
                </p>
                {publicacion.Caracteristicas?.superficie && (
                  <p><strong>Superficie:</strong> {publicacion.Caracteristicas.superficie} m²</p>
                )}
              </div>
              {publicacion.fotos && publicacion.fotos.length > 0 && (
                <div className="publicacion-fotos">
                  <img
                    src={publicacion.fotos[0].url}
                    alt={publicacion.fotos[0].descripcion || 'Foto de la publicación'}
                  />
                </div>
              )}
              <Link to={`/publicacion/${publicacion._id}`}>
                <button>Ver</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No se encontraron publicaciones.</p>
        )}
      </div>
    </div>
  );
};

export default VerPublicaciones;

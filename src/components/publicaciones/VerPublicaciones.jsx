import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VerPublicaciones.css';
import UserNavbar from '../usuarios/UserNavbar';
import Navbar from '../Navbar';
import { useAuth } from '../../services/authContext';

const VerPublicaciones = () => {
  const { isAuthenticated } = useAuth(); // Obtenemos el estado de autenticación
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get('http://localhost:4000/publicacion');
        setPublicaciones(response.data);
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
        {publicaciones.map((publicacion) => (
          <div key={publicacion._id} className="publicacion-card">
            <h3>{publicacion.tipo_publicacion.toUpperCase()}</h3>
            <p><strong>Propiedad:</strong> {publicacion.propiedad?.titulo || 'N/A'}</p>
            <p><strong>Usuario:</strong> {publicacion.usuario?.email || 'N/A'}</p>
            <p><strong>Inmobiliaria:</strong> {publicacion.inmobiliaria?.nombre || 'N/A'}</p>
            <p><strong>Tipo:</strong> {publicacion.tipo}</p>
            <p><strong>Precio:</strong> 
              {publicacion.tipo === 'venta' ? 
                `$${publicacion.precio_venta}` : 
                `$${publicacion.precio_alquiler?.valor} por ${publicacion.precio_alquiler?.periodo}`}
            </p>
            <p><strong>Visibilidad:</strong> {publicacion.visibilidad}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerPublicaciones;

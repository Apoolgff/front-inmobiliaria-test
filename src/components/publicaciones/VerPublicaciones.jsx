import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import UserNavbar from '../usuarios/UserNavbar';
import { useAuth } from '../../services/authContext';
import './VerPublicaciones.css';
import { Link } from 'react-router-dom';
import Filtros from '../Filtros';
import Buscador from '../Buscador';

const VerPublicaciones = () => {
  const { isAuthenticated } = useAuth();
  const [publicaciones, setPublicaciones] = useState([]);
  const [filteredPublicaciones, setFilteredPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    tipo: {},
    venta: false,
    alquiler: false,
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get('http://localhost:4000/publicacion');
        setPublicaciones(response.data);
        setFilteredPublicaciones(response.data);
      } catch (err) {
        setError('Error al cargar las publicaciones');
      } finally {
        setLoading(false);
      }
    };
    fetchPublicaciones();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...publicaciones];
      const { tipo, venta, alquiler } = filters;

      // Filtro por tipo de propiedad
      if (Object.values(tipo).some((value) => value)) {
        filtered = filtered.filter((pub) => tipo[pub.tipo]);
      }

      // Filtro por "En venta" o "En alquiler"
      if (venta && alquiler) {
        filtered = filtered.filter(
          (pub) => pub.enVenta || pub.enAlquiler
        );
      } else if (venta) {
        filtered = filtered.filter((pub) => pub.enVenta);
      } else if (alquiler) {
        filtered = filtered.filter((pub) => pub.enAlquiler);
      }

      // Filtro por texto de búsqueda
      if (searchQuery.trim() !== '') {
        const lowerQuery = searchQuery.toLowerCase();
        filtered = filtered.filter((pub) =>
          pub.titulo.toLowerCase().includes(lowerQuery) ||
          pub.descripcion?.toLowerCase().includes(lowerQuery) ||
          pub.Ubicacion?.ciudad.toLowerCase().includes(lowerQuery) ||
          pub.Ubicacion?.departamento.toLowerCase().includes(lowerQuery)
        );
      }

      setFilteredPublicaciones(filtered);
    };

    applyFilters();
  }, [filters, searchQuery, publicaciones]);

  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {isAuthenticated ? <UserNavbar /> : <Navbar />}
      <div className="ver-publicaciones-container">
        <aside className="filtros-aside">
          <Filtros onApplyFilters={setFilters} />
        </aside>
        <main className="publicaciones-main">
          <Buscador onSearch={setSearchQuery} />
          <div className="publicaciones-container">
            {filteredPublicaciones.length > 0 ? (
              filteredPublicaciones.map((publicacion) => (
                <div className="publicacion-card" key={publicacion.id}>
                  <div className="publicacion-header">
                    <h3>{publicacion.titulo || 'Sin título'}</h3>
                  </div>
                  <div className="publicacion-body">
                    <p><strong>Tipo:</strong> {publicacion.tipo}</p>
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
        </main>
      </div>
    </div>
  );
};

export default VerPublicaciones;

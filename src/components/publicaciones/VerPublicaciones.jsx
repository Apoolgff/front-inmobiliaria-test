import React, { useEffect, useState } from 'react';
import axios from 'axios';

import UserNavBuscador from '../Navegadores/UserNavBuscador';
import { useAuth } from '../../services/authContext';
import './VerPublicaciones.css';
import { Link } from 'react-router-dom';
import Filtros from '../Filtros';

import Dropdown from 'react-bootstrap/Dropdown';

import NavBuscador from '../Navegadores/NavBuscador';
import LoginModal from '../modales/LoginModal';
import RegistroModal from '../modales/RegistroModal';
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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistroModal, setShowRegistroModal] = useState(false);




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

      //Filtro por tipo de propiedad
      if (Object.values(tipo).some((value) => value)) {
        filtered = filtered.filter((pub) => tipo[pub.tipo]);
      }

      //Filtro por "En venta" o "En alquiler"
      if (venta && alquiler) {
        filtered = filtered.filter(
          (pub) => pub.enVenta || pub.enAlquiler
        );
      } else if (venta) {
        filtered = filtered.filter((pub) => pub.enVenta);
      } else if (alquiler) {
        filtered = filtered.filter((pub) => pub.enAlquiler);
      }

      //Filtro por texto de busqueda
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
      {isAuthenticated ? <UserNavBuscador /> : <NavBuscador onLoginClick={() => setShowLoginModal(true)}
          onRegistroClick={() => setShowRegistroModal(true)} />}
      <div className="ver-publicaciones-container">
       
        <main className="publicaciones-main">
      
          <div className="publicaciones-container">
            {filteredPublicaciones.length > 0 ? (
              filteredPublicaciones.map((publicacion) => (
                <div className="publicacion-card" key={publicacion.id}>
                   <Link to={`/publicacion/${publicacion._id}`} className='publicacion-link'>
                    {publicacion.fotos && publicacion.fotos.length > 0 && (
                    <div className="publicacion-fotos">
                      <img
                        src={publicacion.fotos[0].url}
                        alt={publicacion.fotos[0].descripcion || 'Foto de la publicación'}
                      />
                    </div>
                  )}
                  <div className="publicacion-primera_linea">
                   {publicacion.Ubicacion && (
                      <p className="publicacion-locacion">
                        {publicacion.Ubicacion.ciudad}, {publicacion.Ubicacion.departamento}
                      </p>
                    )}
                      <p className="publicacion-tipo">{publicacion.tipo}</p>
                  </div>
                  <div className="publicacion-header">
                    <p>{publicacion.titulo || 'Sin título'}</p>
                    <p>
                      {[
                        publicacion.Caracteristicas.totaldormitorios > 0 &&
                          (publicacion.Caracteristicas.totaldormitorios === 1 
                            ? "Monoambiente" 
                            : `${publicacion.Caracteristicas.totaldormitorios} dormitorios`),
                        publicacion.Caracteristicas.banos > 0 &&
                          (publicacion.Caracteristicas.banos === 1 
                            ? `${publicacion.Caracteristicas.banos} baño` 
                            : `${publicacion.Caracteristicas.banos} baños`),
                        publicacion.Caracteristicas?.superficie &&
                          `${publicacion.Caracteristicas.superficie} m²`
                      ].filter(Boolean).join(" • ")}
                    </p>
                  </div>

                  <div className="publicacion-body">
                 
                   
                   
                     <div className='publicacion-precio_venta'> 
                      {publicacion.enVenta && publicacion.venta?.precio && (
                        <p className='publicacion-precio'>${publicacion.venta.precio.toLocaleString()}</p>
                      )}
                      {publicacion.enAlquiler && publicacion.alquiler?.PrecioPubliacionAlquiler && (
                        <p className='publicacion-precio'> ${publicacion.alquiler.PrecioPubliacionAlquiler.toLocaleString()}</p>
                      )}
                        <p className="publicacion-venta_alquiler">
                      {publicacion.enAlquiler ? 'Alquiler' : 'Venta'} 
                    </p>
                    </div>  
                 
                  </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No se encontraron publicaciones.</p>
            )}
          </div>
          
        </main>
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegistroModal(true);
        }}
      />
      <RegistroModal
        isOpen={showRegistroModal}
        onClose={() => setShowRegistroModal(false)}
        onSwitchToLogin={() => {
          setShowRegistroModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
};

export default VerPublicaciones;

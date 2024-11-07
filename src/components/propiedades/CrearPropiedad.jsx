// CrearPropiedad.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './CrearPropiedad.css';

const CrearPropiedad = () => {
  const [propiedad, setPropiedad] = useState({
    propietario: '',
    propietarioTipo: 'Usuarios',
    tipo: '',
    id: '',
    inmobiliaria: '',
    broker: '',
    enVenta: false,
    enAlquiler: false,
    titulo: '',
    descripcion: '',
    destacada: false,
    url: '',
    ubicacion: {
      departamento: '',
      ciudad: '',
      barrio: '',
      distanciamarmetros: '',
      frentealmar: '',
      direccion: '',
      lat: '',
      lon: ''
    },
    caracteristicas: {
      parrillero: '',
      playroom: '',
      mucamas: '',
      servicioplaya: '',
      tipoedificio: '',
      asensores: '',
      piscina: '',
      estacionamientovisitas: '',
      sauna: '',
      gimnasio: '',
      totaldormitorios: '',
      banos: '',
      suites: '',
      cocina: '',
      capacidadpersonas: '',
      cantidadcamas: '',
      equipamiento: '',
      amenities: '',
      gastoscomunes: '',
      monedagastos: '',
      frecuenciagastos: '',
      antiguedad: '',
      cochera: '',
      superficiepropia: '',
      terrazabalcon: '',
      vista: ''
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
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/propiedades/usuario/${uid}`, propiedad);
      if (response.status === 201) {
        alert('Propiedad agregada con éxito');
    }
    } catch (error) {
      console.error('Error al crear propiedad:', error);
    }
  };

  return (
    <form className="crear-propiedad" onSubmit={handleSubmit}>
      <h2>Información General</h2>
      <input type="text" name="tipo" placeholder="Tipo" value={propiedad.tipo} onChange={handleChange} />
      <input type="text" name="id" placeholder="ID único" value={propiedad.id} onChange={handleChange} />
      <input type="text" name="titulo" placeholder="Título" value={propiedad.titulo} onChange={handleChange} />
      <textarea name="descripcion" placeholder="Descripción" value={propiedad.descripcion} onChange={handleChange} />

      <h2>Ubicación</h2>
      {Object.keys(propiedad.ubicacion).map((key) => (
        <input
          key={key}
          type="text"
          name={key}
          placeholder={key}
          value={propiedad.ubicacion[key]}
          onChange={(e) => handleChange(e, 'ubicacion')}
        />
      ))}

      <h2>Características</h2>
      {Object.keys(propiedad.caracteristicas).map((key) => (
        <input
          key={key}
          type="text"
          name={key}
          placeholder={key}
          value={propiedad.caracteristicas[key]}
          onChange={(e) => handleChange(e, 'caracteristicas')}
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
  );
};

export default CrearPropiedad;

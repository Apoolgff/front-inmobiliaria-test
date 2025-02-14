import React from 'react';
import './DescriptionProperty.css'




const DescriptionProperty= () => {
  
    return (
       <section className='property_description'>
        <article className='property_description_content'>
            <h2>descripcion de la propiedad</h2>
            <p> Casa en venta ubicada en Barrio Parque construida sobre dos lotes con jardín y pileta. 
            Planta baja: hall de entrada con doble puerta, escritorio y living ambos con chimenea. Living y comedor con salida al jardín. Jardín con pileta climatizada. Cocina con office y breakfast con salida al jardín. Lavadero independiente y escalera de servicio que hace una doble circulación. Cochera cubierta para dos autos. Baño de chóferes y de servicio. Hay lugar para dos autos más afuera. 
            Primer piso: living con chimenea y balcón. Cuatro dormitorios: master suite con vista al jardín, chimenea, walk-in closet y gran baño compartimentado. Otra suite que da a la calle Juez Estrada. Los dos dormitorios restantes comparten un baño con ducha y jacuzzi. 
            Segundo piso: tercer living y/o TV room. Quincho y parrilla. Quinto dormitorio con baño. Salida a la terraza. Dos dependencias de servicio con un baño.
            Sótano: sala de máquinas y zona de guardado.
            Aire acondicionado central frío/calor. Calefacción central. Persianas eléctricas en planta baja. Ascensor neumático.
            </p>
        </article>
        <article className='property_article'>
            <div className='property_article-location'>
                <h3 className='property_location-title'>UBICACIÓN REAL</h3>
                <p className='property_location-text'>Hay 13 viviendas cerca de tu ubicación que se ajustan a tu perfil  más info</p>
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d176255.5946248774!2d-56.32637048511281!3d-34.82936109647093!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sus!4v1726064689566!5m2!1ses-419!2sus"
                width="1400"
                height="600"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
            <div className='property_article_content'>
                <h3>Ficha de amenities</h3>
               <ul>
                <li>3 amplias terrazas para disfrutar del aire libre</li>
                <li>Cancha de bochas, ajedrez, tejo, bancos</li>
                <li>Zona fit, gimnasio exterior equipado</li>
                <li>Plaza con juegos infantiles</li>
                <li>Pet Friendly</li>
                <li>Bike Friendly</li>
                <li>Laundry</li>
                <li>Cerraduras electrónicas</li>
                <li>Ecommerce lockers</li>
                <li>Fitness Room</li>
                <li>Indoor Spinning</li>
                <li>Pilates</li>
                <li>Gamers Room</li>
                <li>Open Kitchen</li>
                <li>Barbacoas</li>
               </ul>
            </div>
        </article>
       </section>
    );
};

export default DescriptionProperty;
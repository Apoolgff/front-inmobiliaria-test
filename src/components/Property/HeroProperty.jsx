import React from 'react';
import './HeroProperty.css'




const HeroProperty= () => {
  
    return (
       <section className='property_hero'>
        <div className='property_image'>
            <div className='property_image-content'>
                <p>Venta de inmuebles en Punta Gorda</p>
                <p>aihaus  Venta  Casas  Montevideo  Punta Gorda </p>
            </div>
            <img className='property_image-img' src="/public/images/property-hero.png" alt="" />
        </div>
        <div className='property_info-container'>
        <article className='property_info'>
            <h1 className='property_title'>/ NÓRDICO /</h1>
            <p className='property_address'>Av. Luis Alberto de Herrera esq. Joanicó</p>
            <ul className='property_info_state'>
                <li>En Construcción</li>
                <li>Entrega: Mayo 2025</li>
                <li>Torre A: 50 viviendas</li>
                <li>Torre B: 40 viviendas</li>
            </ul>
            <h2 className='property_title-info'>Info General</h2>
            <hr className='property_title-underline' />
            <p className='property_text-info'> La energía del Cordón llega a La Blanqueada. Una nueva centralidad se proyecta en Montevideo. Entre el Nuevo Centro y el Montevideo Shopping.
                Con la avenida Luis A. De Herrera como principal conector. En la mejor esquina de este renovado eje urbano, nace Nórdico / Ventura.
                Tres edificios conforman el complejo residencial de 209 apartamentos y áreas comunes para disfrutar a diario.
                Diseñamos un nuevo proyecto que cuenta con apartamentos modernos y luminosos a las dos avenidas, y balcones para respirar en todas las unidades.
                Una plaza escalonada con terrazas diseñadas para todas las edades, que te ofrecen vivir experiencias únicas al aire libre.
            </p>
        </article>
        <article className='property_contact'>
            <div> 
                <figure>
                    <img src="/images/swim.png" alt="" />
                    <figcaption></figcaption>
                </figure>
                
            </div>
            <ul className='property_contact_state'>
                <li>MONOAMBIENTE DESDE USD 80.500</li>
                <li>1 DORM. DESDE USD 111.900</li>
                <li>2 DORM. DESDE USD 155.900</li>
                <li>Código: 924388</li>
            </ul>
            <button className='property_contact_button'>Contactenos</button>
        </article>
        </div>
       </section>
    );
};

export default HeroProperty;
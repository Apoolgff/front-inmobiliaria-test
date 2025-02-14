import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import './Location.css';
import 'swiper/css';
import 'swiper/css/navigation';



const Location = () => {
  
    return (
        <section className='home_location'>
            <h2 className='home_location-title'>busca segun tu ubicacion</h2>
            <p className='home_location-text'>Hay 13 viviendas cerca de tu ubicación que se ajustan a tu perfil  </p>
            <Swiper navigation={true} 
            modules={[Navigation]} 
            className="location_swiper"
            >
                <SwiperSlide>
                    <div className='location_article'> 
                        <div className='location_article-image'>
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
                        <div className='location_article-content'>
                            <h3>Punta Ballena</h3>
                            <p>Entre los diques y el río, un distrito moderno y con una 
                                propuesta de lujo. Un espacio donde conviven los
                                nuevos emprendimientos, las mejores torres residenciales y hoteles de altísima categoría. 
                                Los diques están rodeados de edificios portuarios de ladrillo, que albergan oficinas, restaurantes y clubes nocturnos.
                                Punta Gorda se destaca por su arquitectura moderna: 
                                sus grandes torres con vistas increíbles del río y de la ciudad. </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
               
            </Swiper>
        </section>
    );
};

export default Location;

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './Partners.css';
// Import Swiper styles
import 'swiper/css';
import { Link } from 'react-router-dom';




// import required modules




const Partners= () => {
  const agencies = [
    { 
      image: '/images/agencia-1.png',
      title: 'Inmobiliaria Taylers', 
      mail: 'tayler.realestate@gmail.com',
      url: '/property',
      phone: '+598 98 47 56 92'
    },
    { 
      image: '/images/agencia-2.png',
      title: 'Inmobiliaria Taylers', 
      mail: 'tayler.realestate@gmail.com',
      url: '/catalog',
      phone: '+598 98 47 56 92'
    },
    { 
      image: '/images/agencia-3.png',
      title: 'Inmobiliaria Taylers', 
      mail: 'tayler.realestate@gmail.com',
      url: '/property',
      phone: '+598 98 47 56 92'
    },
    { 
      image: '/images/agencia-4.png',
      title: 'Inmobiliaria Taylers', 
      mail: 'tayler.realestate@gmail.com',
      url: '/property',
      phone: '+598 98 47 56 92'
    },
    { 
      image: '/images/agencia-5.png',
      title: 'Inmobiliaria Taylers', 
      mail: 'tayler.realestate@gmail.com',
      url: '/property',
      phone: '+598 98 47 56 92'
    },
    { 
      image: '/images/agencia-1.png',
      title: 'Inmobiliaria Taylers', 
      mail: 'tayler.realestate@gmail.com',
      url: '/property',
      phone: '+598 98 47 56 92'
    },
      
  ];
    return (
      <section className='home_partners'>
       <h2 className='home_promoted-title'>inmobiliarias adheridas</h2>
        <article className='home_partners_slider'>
              <Swiper
        slidesPerView={5.5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
       
        className="mySwiper"
      >
        {agencies.map((agency, index) =>( 
           <SwiperSlide>
           <div className='partners_card' key={index} to={agency.url}>
             <div className='partners_card_image'>
               <img src={agency.image} alt="" />
             </div>
             <h4>{agency.title}</h4>
             <p>{agency.mail}</p>
             <p>{agency.phone}<span>{agency.type}</span></p>
             <Link > 
             <button className='promoted_button'>Consultar</button>
             </Link>
           </div>
         </SwiperSlide>
          ))}
       
      </Swiper>
        </article>
      </section>
    );
};

export default Partners;
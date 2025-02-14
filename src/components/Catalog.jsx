import React from 'react';
import { Link } from 'react-router-dom';
import './Catalog.css';
import Bar from './Property/Bar';





const Catalog = () => {
    const products = [
        { 
          image: '/images/casa-1.png',
          type: 'alquiler', 
          title: 'Punta del Este, Maldonado', 
          description: '6 Dormitorios • 4 baños • 350m2',
          url: '/property',
          price: 'U$s 4000'
        },
        { 
          image: '/images/casa-2.png',
          type: 'alquiler', 
          title: 'Punta del Este, Maldonado', 
          description: '6 Dormitorios • 4 baños • 350m2',
          url: '/property',
          price: 'U$s 4000'},
        { 
          image: '/images/casa-3.png',
          type: 'alquiler', 
          title: 'Punta del Este, Maldonado', 
          description: '6 Dormitorios • 4 baños • 350m2',
          url: '/property',
          price: 'U$s 4000'
        },
        { 
          image: '/images/casa-4.png',
          type: 'alquiler', 
          title: 'Punta del Este, Maldonado', 
          description: '6 Dormitorios • 4 baños • 350m2',
          url: '/property',
          price: 'U$s 4000'
        },
      { 
        image: '/images/casa-5.png',
        type: 'alquiler', 
        title: 'Punta del Este, Maldonado', 
        description: '6 Dormitorios • 4 baños • 350m2',
        url: '/property',
        price: 'U$s 4000'
      },
      { 
        image: '/images/casa-1.png',
        type: 'alquiler', 
        title: 'Punta del Este, Maldonado', 
        description: '6 Dormitorios • 4 baños • 350m2',
        url: '/property',
        price: 'U$s 4000'},
          
      ];
    return (
        <>
         <Bar />
        <section className='catalog_body'>
            <aside className='catalog_aside'>
                
                    <div className='catalog_aside_filter'>
                    <Link className='home_filters_article-links' to='#'>
                        <img src="/public/icons/soil.png" alt="" />
                        Tipo de operacion
                    </Link> <Link className='home_filters_article-links' to='#'>
                        <img src="/public/icons/soil.png" alt="" />
                        Tipo de propiedad
                    </Link>
                    </div>
            </aside>
            <article className='catalog_gallery'>
                <div className='catalog_gallery_filters'>
                    <Link className='home_filters_article-links' to='#'>
                        <img src="/public/icons/soil.png" alt="" />
                        Ver Mapa
                    </Link> <Link className='home_filters_article-links' to='#'>
                        <img src="/public/icons/soil.png" alt="" />
                        Ordenar por
                    </Link>
                </div>
                <div className='gallery'>
                        {products.map((product, index) =>( 
                    
                        <div className='promoted_card' key={index}>
                        <div className='promoted_card_image'>
                        <img src={product.image} alt="" />
                        </div>
                        <h4>{product.title}</h4>
                        <p>{product.description}</p>
                        <p>{product.price}<span>{product.type}</span></p>
                        <Link className='promoted_button' to={product.url}>Más info</Link>
                    </div>
                    ))}
                </div>
            </article>
        </section>
        </>
    );
};

export default Catalog;
import React from 'react';
import { Link } from 'react-router-dom';
import './News.css';




const News = () => {
  
    return (
        <section className='home_news'>
                    <h2>noticias recomendadas</h2>
                    <div class="parent">
                        <div class="child div1"> 
                        <img src="/images/logar-parquet.jpg" alt="" />
                        <p>Pensando en tus pisos nuevos <br />Colocacion y tratamientos de pisos</p>
                          
                        </div>
                        <div class=" child div2">
                        <img src="/images/betonmac.jpg" alt="" />
                            <p>queres construir en tu terreno <br/> Soluciones en hormigon
                            </p>
                        </div>
                        <div class="child div3"> 
                            <img src="/images/yeso-bresso.jpg" alt="" /> 
                            <p>para reformar tu nueva propiedad<br />construcción en seco</p>
                        </div>
                        <div class="child div4"> 
                            <img src="/images/cabo-agua.jpg" alt="" /> 
                            <p>los beneficios de nuestro mar<br /> conoce cabo agua de mar</p>
                        </div>
                        <div class="child div5">
                        <img src="/images/city.webp" alt="" /> 
                            <p>decora el cuarto detus hijos<br /> alfombras decorativas </p>
                           
                        </div>
                      
                    </div>
        </section>
    );
};

export default News;
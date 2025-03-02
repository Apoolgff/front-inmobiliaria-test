import { Link } from "react-router-dom";
import "./HomeFilters.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const HomeFilters = () => {
  return (
    <section className="home_filters">
      <h2 className="home_filters-title">
        Busca rápidamente según tus preferencias
      </h2>
      <Swiper  spaceBetween={5} slidesPerView={2} breakpoints={{
        640: { slidesPerView: 2.5 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 }
      }}>
        <SwiperSlide >
          <Link to="/ver-publicaciones" className="home_filters_article-links">
            <img src="/icons/project.png" alt="" /> Proyectos
          </Link>
        </SwiperSlide>
        <SwiperSlide >
          <Link to="/ver-publicaciones" className="home_filters_article-links">
            <img src="/icons/tree.png" alt="" /> Terrenos
          </Link>
        </SwiperSlide  >
        <SwiperSlide >
          <Link to="/ver-publicaciones" className="home_filters_article-links">
            <img src="/icons/house.png" alt="" /> Casas
          </Link>
        </SwiperSlide>
        <SwiperSlide >
          <Link to="/ver-publicaciones" className="home_filters_article-links">
            <img src="/icons/apartment.png" alt="" /> Apartamentos
          </Link>
        </SwiperSlide>
        <SwiperSlide >
          <Link to="/ver-publicaciones" className="home_filters_article-links">
            <img src="/icons/grass.png" alt="" /> Chacras
          </Link>
        </SwiperSlide>
        <SwiperSlide  >
          <Link to="/ver-publicaciones" className="home_filters_article-links">
            <img src="/icons/soil.png" alt="" /> Campos
          </Link>
        </SwiperSlide >
      </Swiper>
    </section>
  );
};

export default HomeFilters;

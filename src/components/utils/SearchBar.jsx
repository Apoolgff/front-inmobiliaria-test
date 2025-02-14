import React from 'react';

import './SearchBar.css';




const SearchBar = () => {


    return (
            <div className='home_hero_search'>
                <div className='home_hero_filters'> 
                    <button className='home_hero_filters-button' type="submit">Venta</button>
                    <button className='home_hero_filters-button' type="submit">Alquiler</button>
                    <button className='home_hero_filters-button' type="submit">Temporal</button>
                </div>
                <form className='home_hero_search_form' action="#">
                    <input className='home_hero_search_form-input'  type="text" placeholder="Search.." name="search"></input>
                    <button className='home_hero_filters-button' type="submit">Buscar</button>
                </form>
            </div>
            );
        };
export default SearchBar;
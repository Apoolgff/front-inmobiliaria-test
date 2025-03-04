import React from 'react';

import './SearchBar.css';




const SearchBar = () => {


    return (
            <div className='home_hero_search'>
    
                <form className='home_hero_search_form' action="#">
                    <input className='home_hero_search_form-input'  type="text" placeholder="Search.." name="search"></input>
                    <button className='home_hero_filters-button' type="submit">Buscar</button>
                </form>
            </div>
            );
        };
export default SearchBar;
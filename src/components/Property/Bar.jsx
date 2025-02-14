import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from '../utils/SearchBar';




const Bar = () => {
  
    return (
        <>
        <header className='home_header'>
            <div className='home_logo'>
                <img src="/icons/whale.png" alt="" />
                <p className='home_logo-title'>Lotesde<span>mar</span></p>
            </div>
            <SearchBar />
            <div className='home_login'>
                <p className='home_logo-login'>Publica una propiedad</p>
                <img src="/icons/user.png" alt="" />
            </div>
        </header>
        </>
    );
};

export default Bar;
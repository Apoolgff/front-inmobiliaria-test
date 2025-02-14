import React from 'react';
import Header from './Home/Header';
import Promoted from './Home/Promoted';
import Location from './Home/Location';
import Team from './Home/Team';
import Partners from './Home/Partners';

import './Home.css';



const Navbar = () => {
   
    return (
        <>
            <Header />
            <Promoted />
            <Location />
            <Team />
            <Partners />
         
        </>
    );
};

export default Navbar;
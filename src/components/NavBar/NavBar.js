import React, { useState } from 'react';

import './NavBar.css';
import NavList from './NavList/NavList';

function NavBar(props){
   const [openMobileMenu, setOpenMobileMenu] = useState(false) 

    return ( 
    <header>
        <nav className="bg-dark-peach p-lr-125em">
            <div className={`navbar container ${ openMobileMenu ? 'active' : ''}`}>
                <div className="nav-brand">
                    <div className="narbar-burger" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="nav-menu">
                    <div className="nav-left">
                        <div className="nav-list">
                            <NavList to="/create-product" label="Create Product" />
                            <NavList to="/products" label="Product Lists" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    );
}
 
export default NavBar;
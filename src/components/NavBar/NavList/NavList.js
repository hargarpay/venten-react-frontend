import React from 'react';
import {Route, Link} from 'react-router-dom';


function NavList({to, label, activeOnlyWhenExact}){
    return ( 
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({match}) => (
                <div className={`nav-item ${match ? 'active' : ''}`}>
                    <Link to={to}>
                        {label}
                    </Link>
                </div>
            )}
        />
     );
}
 
export default NavList;
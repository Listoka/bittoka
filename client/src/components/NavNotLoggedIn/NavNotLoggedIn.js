import React from "react";
import { Link } from 'react-router-dom';

const NavNotLoggedIn = () => {

    return (
        <ul className="navbar-nav ">
            <li className="nav-item">
              <div className="nav-link hvr-glow"><Link style={{ color:'ghostwhite' }} to="/gist">Gist</Link><span className="sr-only">Gist</span></div>
            </li>
            <li className="nav-item">
              <div className="nav-link hvr-glow"><Link style={{ color:'ghostwhite' }} to="/join">Join</Link><span className="sr-only">Join</span></div>
            </li>
            <li className="nav-item">
              <div className="nav-link hvr-glow"><Link style={{ color:'ghostwhite' }} to="/login">Login</Link><span className="sr-only">Login</span></div>
            </li>
        </ul>
    )
};

export default NavNotLoggedIn;
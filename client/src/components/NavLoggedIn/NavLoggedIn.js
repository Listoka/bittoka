import React from "react";
import { Link } from 'react-router-dom';

const NavLoggedIn = (props) => {

    return (
        <ul className="navbar-nav">
            <li className="nav-item">
              <div className="nav-link"><Link style={{ color:'snow' }} to="/gist">Gist</Link><span className="sr-only">Gist</span></div>
            </li>
            <li className='nav-item'>
              <div onClick={(event) => props.logOutHandler(event)} className="nav-link"><Link style={{ color:'snow' }} to="/">Sign Out</Link><span className="sr-only">Sign Out</span></div>
            </li>
            <li className="nav-item">
              <div className="nav-link"><Link style={{ color:'snow' }} to="/account">Account</Link><span className="sr-only">Account</span></div>
            </li>
        </ul>
    )
};

export default NavLoggedIn;
import React from "react";
import { Link } from 'react-router-dom';

export const NavNotLoggedIn = () => {

    return (
        <ul className="nav navbar-nav navbar-right">
            <li className="nav-item" data-toggle="collapse" data-target="#navbar-collapse.in">
              <div className="nav-link"><Link style={{ color:'snow' }} to="/gist">Gist</Link><span className="sr-only">Gist</span></div>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target="#navbar-collapse.in">
              <div className="nav-link"><Link style={{ color:'snow' }} to="/join">Join</Link><span className="sr-only">Join</span></div>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target="#navbar-collapse.in">
              <div className="nav-link"><Link style={{ color:'snow' }} to="/login">Login</Link><span className="sr-only">Login</span></div>
            </li>
        </ul>
    )
};
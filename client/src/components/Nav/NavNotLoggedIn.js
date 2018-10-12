import React from "react";
import { Link } from 'react-router-dom';

export const NavNotLoggedIn = () => {

    return (
        <ul className="nav navbar-nav navbar-right">
            <li className="nav-item" data-toggle="collapse" data-target="#navbar-collapse.in">
              <div className="nav-link"><Link style={{ color:'snow' }} to="/gist">Gist</Link><span className="sr-only">Gist</span></div>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target="#navbar-collapse.in">
              <div className="nav-link hover" style={{ color:'snow' }}><a>Join<span className="sr-only">Join</span></a></div>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target="#navbar-collapse.in">
              <div className="nav-link hover" style={{ color:'snow' }}><a>Login<span className="sr-only">Login</span></a></div>
            </li>
            {/* Will need to pass in an onclick function. We pass in the props here. Within Nav we add the function to pop up the modal. */}
        </ul>
    )
};
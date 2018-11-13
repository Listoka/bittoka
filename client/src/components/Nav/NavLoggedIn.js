import React from "react";
import { Link } from 'react-router-dom';

export const NavLoggedIn = (props) => {

  return (
    <React.Fragment>
      <li className='nav-item' data-toggle="collapse" data-target="#navbar-collapse.in">
        <div onClick={(event) => props.logOutHandler(event)} className="nav-link"><Link style={{ color: 'snow' }} to="/">Sign Out</Link><span className="sr-only">Sign Out</span></div>
      </li>
      <li className="nav-item" data-toggle="collapse" data-target="#navbar-collapse.in">
        <div className="nav-link"><Link style={{ color: 'snow' }} to="/account">Account</Link><span className="sr-only">Account</span></div>
      </li>
    </React.Fragment>
  );
};

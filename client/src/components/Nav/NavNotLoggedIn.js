import React from "react";

export const NavNotLoggedIn = (props) => {
  return (
    <React.Fragment>
      <li className="nav-item" data-toggle="collapse" data-target="#navbar-collapse.in">
        <div className="nav-link hover">
          <a style={{ color: 'snow' }} onClick={(e) => props.openModal(e, 'JOIN')} href='/'>Join</a>
          <span className="sr-only">Join</span>
        </div>
      </li>
      <li className="nav-item" data-toggle="collapse" data-target="#navbar-collapse.in">
        <div className="nav-link">
          <a style={{ color: 'snow' }} onClick={(e) => props.openModal(e, 'LOGIN')} href='/'>Login</a>
          <span className="sr-only">Login</span>
        </div>
      </li>
    </React.Fragment>
  )
};
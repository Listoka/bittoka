import React from "react";
import { Link } from 'react-router-dom';

export const NavNotLoggedIn = (props) => {
  console.log('NavNotLoggedIn props', props)
  return (
    <ul className="nav navbar-nav navbar-right">
      <li className="nav-item" data-toggle="collapse" data-target="#navbar-collapse.in">
        <div className="nav-link">
          <a style={{ color: 'snow' }} onClick={(e) => props.openModal(e, 'GIST')} href='/'>Gist</a>
          <span className="sr-only">Gist</span>
        </div>
      </li>
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
    </ul>
  )
};
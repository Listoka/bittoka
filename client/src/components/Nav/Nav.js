import React from "react";
import './Nav.css';
import SignOut from "../SignOut";
import AuthUserContext from '../AuthUserSession/AuthUserContext'
import { auth } from '../../firebase'

const logOutHandler = (event) => {
  event.preventDefault()
  auth.doSignOut()
}

const Nav = () => {
  return (
    <div className="container-fluid descriptionBox">
      <nav className="navbar navbar-expand-lg navbar-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <span id="logoImage"><a href="/">Bittoka</a></span>
        <div className="navbar-collapse collapse justify-content-end" id="navbarTogglerDemo03">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link hvr-glow" href="/gist">Gist <span className="sr-only">Jist</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link hvr-glow" href="/join">Join <span className="sr-only">Jist</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link hvr-glow" href="/login">Login <span className="sr-only">Login</span></a>
            </li>
            <li className='nav-item'>
              <a onClick={logOutHandler} className="nav-link hvr-glow" href="/SignOut">Sign Out <span className="sr-only">Sign Out</span></a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )

};

export default Nav;
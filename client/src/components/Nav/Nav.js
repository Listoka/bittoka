import React from "react";
import './Nav.css';

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
          <a className="nav-link hvr-glow" href="/jist">Jist <span className="sr-only">Jist</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link hvr-glow" href="/join">Join <span className="sr-only">Jist</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link hvr-glow" href="/sign-up">Login <span className="sr-only">Login</span></a>
        </li>
    </ul>
    </div>
    </nav>
  </div>
  )
  
};

export default Nav;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavLoggedIn from "../NavLoggedIn";
import NavNotLoggedIn from "../NavNotLoggedIn";
import './Nav.css';
import AuthUserContext from '../AuthUserSession/AuthUserContext';
import { auth } from '../../firebase';
import Typist from 'react-typist';
import Typwriter from '../Typwriter';

//Will need to update a logged in / logged out state
class Nav extends Component {
  constructor(props) {
    super(props);
  }

  logOutHandler = (event) => {
    event.preventDefault()
    auth.doSignOut()
  }

  render() {
    return (
      <div className="container-fluid descriptionBox">
        <nav className="navbar navbar-expand-lg navbar-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <span id="logoImage"><Link style={{ color:'ghostwhite' }} to='/'>Listoka</Link></span>
            <Typwriter
                cursor={{ 
                show: true,
                blink: true,
                element: '|',
                hideWhenDone: true,
                hideWhenDoneDelay: 500,
              }}
            ></Typwriter>
          <div className="navbar-collapse collapse justify-content-end" id="navbarTogglerDemo03">
            <AuthUserContext.Consumer>
              {
                authUser =>
                  authUser
                    ? <NavLoggedIn logOutHandler={this.logOutHandler} />
                    : <NavNotLoggedIn />
              }
            </AuthUserContext.Consumer>
          </div>
        </nav>
      </div>
    )
  }
}

export default Nav;
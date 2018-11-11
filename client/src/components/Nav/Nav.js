import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLoggedIn, NavNotLoggedIn } from "../Nav";
// import NavNotLoggedIn from "../NavNotLoggedIn";
import AuthUserContext from '../AuthUserSession/AuthUserContext';
import { auth } from '../../firebase';

//Will need to update a logged in / logged out state
export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  logOutHandler = (event) => {
    event.preventDefault();
    auth.doSignOut();
  };

  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light">
        <span id="logoImage"><Link style={{ color: 'snow', textDecoration: 'none' }} to='/'>Listoka</Link></span>
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#collapsingNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span> </span>
          <span> </span>
          <span> </span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="collapsingNavbar">
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item" data-toggle="collapse" data-target="#navbar-collapse.in">
              <div className="nav-link">
                <a style={{ color: 'snow' }} onClick={(e) => this.props.openModal(e, 'GIST')} href="/">Gist</a>
                <span className="sr-only">Gist</span>
              </div>
            </li>
            <AuthUserContext.Consumer>
              {
                authUser =>
                  authUser
                    ? <NavLoggedIn {...this.props} logOutHandler={this.logOutHandler} />
                    : <NavNotLoggedIn {...this.props} />
              }
            </AuthUserContext.Consumer>
          </ul>
        </div>
      </nav>
    )
  }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLoggedIn, NavNotLoggedIn } from "../Nav";
import AuthUserContext from '../AuthUserSession/AuthUserContext';
import { auth } from '../../firebase';
import ModalLaunchContext from '../Modals/ModalLaunchContext';
import ListokaLogoWhite from '../../assets/images/ListokaLogoWhite.png';
// import ListokaLogo from '../../assets/images/ListokaLogo.png';

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
      <React.Fragment>
      <nav className='flex bg-soft-black p-3 justify-between'>
        <span className='inline-flex'><Link className='inline-flex items-center no-underline' to='/'><img className='h-12'src={ListokaLogoWhite} alt='ListokaImage'></img></Link></span>
        <div className='relative group'>
          {/* <ModalLaunchContext.Consumer>
            {openModal => (
              <li className="inline-block" data-toggle="collapse" data-target="#navbar-collapse.in">
                <div className="nav-link">
                  <a className='text-white inline-block' onClick={(e) => openModal(e, 'GIST')} href="/">Gist</a>
                  <span className="sr-only">Gist</span>
                </div>
              </li>
            )}
          </ModalLaunchContext.Consumer> */}
          <AuthUserContext.Consumer>
            {
              authUser =>
                authUser
                  ? <NavLoggedIn {...this.props} logOutHandler={this.logOutHandler} />
                  : <NavNotLoggedIn {...this.props} />
            }
          </AuthUserContext.Consumer>
        </div>
      </nav>
    </React.Fragment>
    )
  }
}
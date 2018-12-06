import React from "react";
import ModalLaunchContext from "../Modals/ModalLaunchContext";
import { Button } from '../../components/Widgets';

export const NavNotLoggedIn = (props) => {
  return (
    <ModalLaunchContext.Consumer>
      {openModal => (
        <React.Fragment>
          <div className='items-center'>
            <div className="inline-flex" data-toggle="collapse" data-target="#navbar-collapse.in">
                <a className='text-white text-xl font-header font-bold hover:text-brand-green' onClick={(e) => openModal(e, 'LOGIN')} href='/'>Login</a>
                <span className="sr-only">Login</span>
            </div>
            <div className="inline-flex" data-toggle="collapse" data-target="#navbar-collapse.in">
                <Button className='btn btn-nav btn-nav:hover btn-nav:active outline-none'text={'Get Started'} onClick={(e) => openModal(e, 'JOIN')} href='/'>Get Started</Button>
                <span className="sr-only">Join</span>
            </div>
            </div>
        </React.Fragment>
      )}
    </ModalLaunchContext.Consumer>
  )
};
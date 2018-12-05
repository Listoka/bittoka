import React from "react";
import { Link } from 'react-router-dom';

export const NavLoggedIn = (props) => {

  return (
    <React.Fragment>
      <div className='mt-2'>
      <div className='inline-flex cursor-pointer items-center group-hover:rounded-t-lg py-1 px-2' data-toggle="collapse" data-target="#navbar-collapse.in">
        <div className="text-white text-xl font-header font-bold"><Link style={{ color: 'white' }} to="/account">My Account</Link><span className="sr-only">Account</span></div>
      </div>
      <div className="absolute p-1 bg-soft-black p-2 invisible group-hover:visible w-full">
        <div onClick={(event) => props.logOutHandler(event)} className="text-white text-lg font-header" data-toggle="collapse" data-target="#navbar-collapse.in"><Link style={{ color: 'white' }} to="/">Sign Out</Link><span className="sr-only">Sign Out</span></div>
      </div>
      </div>
    </React.Fragment>
  );
};

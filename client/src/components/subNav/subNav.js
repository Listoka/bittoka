import React from 'react';
import { Link } from 'react-router-dom';

const SubNav = props => (
  <React.Fragment>
      <div className='flex align-center items-center mx-2 my-3 ' id={props.id}>
          <Link className='inline-flex text-base text-light-gray text-body hover:text-brand-green' to={`/categories/${props.href}`}> {props.name}</Link>
      </div>
  </React.Fragment>
);

export default SubNav;
import React from 'react';
import { Link } from 'react-router-dom';

const SubNav = props => (
    //Adds an ID, the proper href link, and the actual name for each main category
    <div className='flex  align-center items-center mx-2 my-3' id={props.id}>
        {/* <div className='hvr-glow'> <Link to={`/${props.href}`}>{`[${props.id}] ${props.name}`}</Link></div> */}
        <div className=''>
          <Link className='inline-flex text-white text-body hover:text-brand-green' to={`/categories/${props.href}`}> {props.name}</Link>
        </div>
    </div>
);

export default SubNav;

// .flex-item {
//   flex: none;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   margin: 5px 7px;
//   font-weight: bold;
// }
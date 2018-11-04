import React from 'react';
import { Link } from 'react-router-dom';

const SubNav = props => (
    //Adds an ID, the proper href link, and the actual name for each main category
    <div className='flex-item' id={props.id}>
        {/* <div className='hvr-glow'> <Link to={`/${props.href}`}>{`[${props.id}] ${props.name}`}</Link></div> */}
        <div className='hvr-glow subNavItem borderXwidth'>
        <h4><Link to={`/categories/${props.href}`}>[{props.id}] {props.name}</Link></h4>
        </div>
    </div>
);

export default SubNav;
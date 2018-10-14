import React from 'react';
import './subNav.css';
import { Link } from 'react-router-dom';

const SubNav = props => (
    //Adds an ID, the proper href link, and the actual name for each main category
    <div className='flex-item' id={props.id}>
        {/* <div className='hvr-glow'> <Link to={`/${props.href}`}>{`[${props.id}] ${props.name}`}</Link></div> */}
        <div className='hvr-glow'>
        <Link to={`/categories/${props.href}`}>[{props.id}]{props.name}</Link>
        </div>
    </div>
);

export default SubNav;
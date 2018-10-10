import React from 'react';
import './subNav.css';

const SubNav = props => (
    //Adds an ID, the proper href link, and the actual name for each main category
    <div className='flex-item' id={props.id}>
        {/* <div className='hvr-glow'> <Link to={`/${props.href}`}>{`[${props.id}] ${props.name}`}</Link></div> */}
        <div className='hvr-glow'><a onClick={() => props.handleCategoryChange(props.href)}>[{props.id}]{props.name}</a></div>
    </div>
);

export default SubNav;
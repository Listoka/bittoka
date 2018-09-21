import React from "react";
import './subNav.css';

const SubNav = props => (
    //Adds an ID, the proper href link, and the actual name for each main category
    <div className="flex-item" id={props.id}>
        <a className="hvr-glow" href={`/${props.href}`}>{`[${props.id}] ${props.name}`}</a>
    </div>
);

export default SubNav;
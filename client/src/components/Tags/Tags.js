import React from 'react';
import './Tags.css';
import { Link } from 'react-router-dom';

const Tags = props => {
    return (
        //Andrew do your thing.
        <li className="tagLink">
            {props.tag}
        </li>
    )
}

export default Tags;
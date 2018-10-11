import React from "react";
import { Link } from 'react-router-dom';
import './CreatePostButton.css';

export const CreatePostButton = props => {
    return (
        <button className="btn btn-success postBtn"><Link style={{ color: 'snow', textDecoration: 'none' }} to={{pathname:'/createpost', state:{categoryName: props.categoryName}}}>Create Post</Link></button>
    );
};
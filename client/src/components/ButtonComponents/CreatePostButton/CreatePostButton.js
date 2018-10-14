import React from "react";
import { Link } from 'react-router-dom';
import './CreatePostButton.css';

export const CreatePostButton = props => {
    return (
        <button className="btn btn-success postBtn">
        <Link
            style={{ color: 'snow', textDecoration: 'none' }}
            to={{pathname:`/categories/${props.categoryName}/posts/new`}}>Create Post</Link></button>
    );
};
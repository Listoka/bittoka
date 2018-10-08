import React from 'react';
import { Link } from 'react-router-dom';
import './postListItem.css';

const PostListItem = props => {
    return (
        <div className='card listItem' id={props._id}>
            <div className='card-title'><Link to={'/api/posts/' + props._id}><h4>{props.title}</h4></Link></div>
            <h6 className='card-subtitle'>Posted by: {props.authorName}</h6>
            <p className='card-text'>{props.body}</p>
            </div>
    );
};

export default PostListItem;
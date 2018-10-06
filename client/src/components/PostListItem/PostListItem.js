import React from 'react';
import { Link } from 'react-router-dom';
import './postListItem.css';

const PostListItem = props => {
    return (
        <div className='panel panel-success border' id={props._id}>
            <div className='panel-heading'><Link to={'/api/posts/' + props._id}><h4>{props.title}</h4></Link></div>
            <div className='panel-body'><h6>Posted by: {props.authorName}</h6>
            <p>{props.body}</p>
            </div>
        </div>
    );
};

export default PostListItem;
import React from 'react';
import './postListItem.css';

const PostListItem = props => {
    return (
        <div className='panel panel-success border' id={props._id}>
            <div className='panel-heading'><h4>{props.title}</h4></div>
            <div className='panel-body'><h6>Posted by: {props.authorName}</h6>
            <p>{props.body}</p>
            </div>
        </div>
    );
};

export default PostListItem;
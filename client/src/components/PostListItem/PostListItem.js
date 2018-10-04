import React from 'react';
import './postListItem.css'

const PostListItem = props => {
    return (
        <div className='panel panel-success'>
            <div className='panel-heading'>props.title will be here</div>
            <div className='panel-body'>props.username and other stats such as total tipped would be here</div>
        </div>
    );
};

export default PostListItem;
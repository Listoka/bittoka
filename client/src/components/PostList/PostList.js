import React from 'react';
import './postList.css'

const PostList = ({children}) => {
    return (
        <div className='container postList'>
            {children}
            {/*Perhaps 20-30 displayed per page with 5-10 visible on a normal screen */}
        </div>
    );
};

export default PostList;
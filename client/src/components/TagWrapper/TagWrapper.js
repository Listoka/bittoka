import React from 'react';
import './TagWrapper.css'

const TagWrapper = ({ children }) => {
    return (
        <div className='tagWrapper rounded'>
            <div className='headWrapper'>
                <p>Tags</p>
            </div>
            <ul id="tagUl">
                {children}
            </ul>
        </div>
    );
};

export default TagWrapper;
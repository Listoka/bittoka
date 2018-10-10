import React from 'react';
import './TagWrapper.css'

export const TagWrapper = ({ children }) => {
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
import React from 'react';

export const MainWrapper = props => {
    return (
        <div className={`px-10px ${props.styles}`}>
            {props.children}
        </div>
    );
};
import React from 'react';

export const MainWrapper = props => {
    return (
        <div className={`m-10px ${props.styles}`}>
            {props.children}
        </div>
    );
};
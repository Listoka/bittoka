import React from 'react';

export const MainWrapper = props => {
    return (
        <div className={`my-10px px-10px ${props.styles}`}>
            {props.children}
        </div>
    );
};
import React from 'react';

export const MainWrapper = props => {
    return (
        <div className={`m-10px p-10px pt-3 rounded ${props.styles}`}>
            {props.children}
        </div>
    );
};
import React from 'react';

export const MainWrapper = props => {
    return (
        <div className={`m-10px pt-3 p-10px rounded bg-white ${props.classType}`}>
            {props.children}
        </div>
    );
};
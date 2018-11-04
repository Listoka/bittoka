import React from 'react';

export const Button = props => {
    return (
        <button className='btn postBtn' {...props}>
          <span className={`${props.classType} font-paragraph`}>{props.text}</span>
        </button>
    );
};
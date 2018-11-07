import React from 'react';

export const Button = props => {
    return (
      // The Bootstrap and postBtn will be changed once Lindsay themes the website. Left for now.
        <button className='btn postBtn' {...props}>
          <span className={`font-normal ${props.styles}`}>{props.text}</span>
        </button>
    );
};
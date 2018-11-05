import React from 'react';

export const Header = props => {
  return (
    <h4 {...props} className={`font-header ${props.styles}`}>
      {props.children}
    </h4>
  )
};
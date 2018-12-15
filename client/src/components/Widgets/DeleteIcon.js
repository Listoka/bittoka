import React from 'react';

export const DeleteIcon = props => {
  return (
    <React.Fragment>
      <i className={`far fa-trash-alt cursor-pointer text-xs ${props.styles}`}{...props}>
        <span> {props.text}</span>
      </i>
    </React.Fragment>
  );
};
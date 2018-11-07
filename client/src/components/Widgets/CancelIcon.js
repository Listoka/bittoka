import React from 'react';

export const CancelIcon = props => {
    return (
      <React.Fragment>
        <i className="fas fa-undo btn" {...props}>
          <span className='font-normal text-base'> {props.text}</span>
        </i>
      </React.Fragment>
    );
};
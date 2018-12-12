import React from 'react';

export const CancelIcon = props => {
    return (
      <React.Fragment>
        <i className={`fas text-sm fa-undo cursor-pointer ${props.styles}`} {...props}>
          <span className='font-normal text-sm'> {props.text}</span>
        </i>
      </React.Fragment>
    );
};
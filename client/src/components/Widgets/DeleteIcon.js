import React from 'react';

export const DeleteIcon = props => {
    return (
      <React.Fragment>
        <i className="far fa-trash-alt text-link-color btn">
          <span className='font-normal text-base'> {props.text}</span>
        </i>
      </React.Fragment>
    );
};
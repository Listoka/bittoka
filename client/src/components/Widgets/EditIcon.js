import React from 'react';

export const EditIcon = props => {
    return (
      <React.Fragment>
          <i {...props} className={`far fa-edit text-sm cursor-pointer ${props.styles}`}>
              <span className='font-normal text-sm'>{props.text}</span>
          </i>
      </React.Fragment>
    );
};
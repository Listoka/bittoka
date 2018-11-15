import React from 'react';

export const EditIcon = props => {
    return (
      <React.Fragment>
        <div className='-mb-1'>
          <i {...props} className={`far fa-edit text-link-color btn text-base`}>
              <span className='font-normal text-base'>{props.text}</span>
          </i>
        </div>
      </React.Fragment>
    );
};
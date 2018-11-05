import React from 'react';

export const ClearFix = props => {
    return (
      <React.Fragment>
        <div className='clearfix'>{props.children}</div>
      </React.Fragment>
    );
};
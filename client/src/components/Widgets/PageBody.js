import React from 'react';

export const PageBody = props => {
    return (
      <React.Fragment>
        <div {...props} className='absolute w-full'></div>
      </React.Fragment>
    );
};
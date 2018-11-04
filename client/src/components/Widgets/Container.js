import React from 'react';

export const Container = props => {
    return (
      <React.Fragment>
        <div {...props} className='container'></div>
      </React.Fragment>
    );
};
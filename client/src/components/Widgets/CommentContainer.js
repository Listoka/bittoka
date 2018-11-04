import React from 'react';

export const CommentContainer = props => {
    return (
      <React.Fragment>
        <div {...props} className='text-base m-10px px-10px py-5px border-l-2 border-solid border-black'></div>
      </React.Fragment>
    );
};
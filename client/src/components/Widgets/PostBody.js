import React from 'react';

export const PostBody = props => {
    return (
      <React.Fragment>
        <div className='pt-10px pr-10px pl-15px w-full'>{props.children}</div>
      </React.Fragment>
    );
};
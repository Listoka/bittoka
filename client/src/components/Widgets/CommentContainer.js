import React from 'react';

export const CommentContainer = props => {
    return (
      <React.Fragment>
        <div {...props} className={`text-base m-10px px-10px py-5px border-l-2 border-solid rounded ${props.styles}`}>
          {props.children}
        </div>
      </React.Fragment>
    );
};
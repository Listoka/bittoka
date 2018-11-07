import React from 'react';

export const Row = props => {
    return (
      <React.Fragment>
        <div {...props} className={`flex flex-wrap -mx-4 ${props.styles}`}>
          {props.children}
        </div>
      </React.Fragment>
    );
};
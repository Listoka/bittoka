import React from 'react';

export const Card = props => {
    return (
      <React.Fragment>
        <div className={`flex flex-col mb-2 p-4 rounded-lg bg-darkest-gray break-words ${props.styles}`}>
          {props.children}
        </div>
      </React.Fragment>
    );
};
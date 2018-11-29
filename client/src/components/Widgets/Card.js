import React from 'react';

export const Card = props => {
    return (
      <React.Fragment>
        <div className={`flex flex-col mb-20px p-40px rounded-8px bg-darkest-gray break-words ${props.styles}`}>
          {props.children}
        </div>
      </React.Fragment>
    );
};
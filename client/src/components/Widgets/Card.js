import React from 'react';

export const Card = props => {
    return (
      <React.Fragment>
        <div className={`relative break-words flex flex-col min-w-0 border border-black text-sm m-10px py-5px px-10px rounded ${props.styles}`}>
          {props.children}
        </div>
      </React.Fragment>
    );
};
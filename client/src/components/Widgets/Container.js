import React from 'react';

export const Container = props => {
    return (
      <React.Fragment>
        <div className={`container ${props.styles}`}>{props.children}</div>
      </React.Fragment>
    );
};
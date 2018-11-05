import React from 'react';

export const InlineParagraph = props => {
    return (
      <React.Fragment>
        <p className={`inline ${props.styles}`}>{props.children}</p>
      </React.Fragment>
    );
};
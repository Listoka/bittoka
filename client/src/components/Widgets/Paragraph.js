import React from 'react';

export const Paragraph = props => {
    return (
      <React.Fragment>
        <p className={`${props.styles}`}>
          {props.text}{props.children}
        </p>
      </React.Fragment>
    );
};
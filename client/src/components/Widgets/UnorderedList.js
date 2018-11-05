import React from 'react';

export const UnorderedList = props => {
    return (
      <React.Fragment>
        <ul className={`list-reset ${props.styles}`}>{props.text}{props.children}</ul>
      </React.Fragment>
    );
};
import React from 'react';

export const ParagraphSmallText = props => {
    return (
      <React.Fragment>
        <p className={`text-sm ${props.classStyle}`}>{props.children}</p>
      </React.Fragment>
    );
};
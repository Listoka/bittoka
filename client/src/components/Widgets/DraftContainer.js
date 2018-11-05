import React from 'react';

export const DraftContainer = props => {
    return (
      <React.Fragment>
        <div {...props} className={`bg-white mt-10px ml-10px mb-10 py-3 min-h-full rounded ${props.styles}`}>
          {props.children}
        </div>
      </React.Fragment>
    );
};
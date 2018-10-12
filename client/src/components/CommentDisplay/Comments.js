import React from "react";

export const Comments = (props) => {
    return (
        <React.Fragment>
           <hr/>
           <p>Author: {props.authorName}</p>
           <p>Body: {props.body}</p>
        </React.Fragment>
    );
};
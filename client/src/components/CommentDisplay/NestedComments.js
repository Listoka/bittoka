import React from "react";
import './NestedComments.css';

export const NestedComments = (props) => {
    const createdDate = props.createdAt && props.createdAt.slice(0, 10)
    return (
        <React.Fragment>
           <div className="subComment">
            <hr/>
            <p>Subcomments</p>
            <p><b>Author:</b> {props.authorName} [earned $x.xx]</p> 
            <p><b>Comment:</b> {props.body}</p>
            <p>Created on: {createdDate}</p>
           </div>
        </React.Fragment>
    );
};
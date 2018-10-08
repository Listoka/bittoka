import React from "react";

const Comments = (props) => {
    return (
        <div>
           <p>Author: {props.author}</p>
           <p>Body: {props.body}</p>
        </div>
    );
};

export default Comments;
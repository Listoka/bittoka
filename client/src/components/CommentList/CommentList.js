import React from "react";

//This is the container that holds the mapped-out comments
const CommentList = (props) => {

    return (
        <div>
        {props.children}
        </div>
    )
};

export default CommentList;
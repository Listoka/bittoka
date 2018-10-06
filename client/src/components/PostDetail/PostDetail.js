import React from "react";

const PostDetail = (props) => {

    return (
        //Andrew do your thing.
        <div>
            <br/>
            <p>{props.title}</p>
            <p>By: {props.authorName}</p>
            <p>{props.body}</p>
        </div>
    )
}

export default PostDetail;
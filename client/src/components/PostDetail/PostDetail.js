import React from "react";
import CommentBox from '../../components/CommentBox';

const PostDetail = (props) => {
    return (
        <div>
            <br/>
            <p>{props.title}</p>
            <p>By: {props.authorName}</p>
            <p>{props.body}</p>
            <CommentBox />
        </div>
    );
};

export default PostDetail;
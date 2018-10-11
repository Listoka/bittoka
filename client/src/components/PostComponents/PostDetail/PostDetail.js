import React from "react";
import CommentBox from '../../CommentBox';
import { Link } from 'react-router-dom';

export const PostDetail = (props) => {
    return (
        <div>
            <br/>
            <Link to={{pathname:'/editpage', state:{categoryName: props.categoryName, body: props.body, _id: props._id, title: props.title, teaser: props.teaser, authorName: props.authorName, categoryName: props.categoryName}}}><i className="far fa-edit"> Edit Post</i></Link>
            <p>{props.title}</p>
            <p>By: {props.authorName}</p>
            <p>{props.body}</p>
            <CommentBox />
        </div>
    );
};
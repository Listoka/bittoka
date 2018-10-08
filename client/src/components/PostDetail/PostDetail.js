import React from "react";
import CommentList from '../../components/CommentList';
// import Comments from '../../components/Comments';
import CommentBox from '../../components/CommentBox';

const PostDetail = (props) => {

    return (
        //Andrew do your thing.
        <div>
            <br/>
            <p>{props.title}</p>
            <p>By: {props.authorName}</p>
            <p>{props.body}</p>
            <CommentBox 
            
            />
            <CommentList>
            {/* {props.comments.map(comments => {
                <Comments 
                author={comments.author}
                body={comments.body} 
                voters={comments.voters} 
                comments={comments.comments} 
                commentPath={comments.commentPath}
                />
            })} */}
            </CommentList>
            <p>{props.comments}</p>
            {console.log(props.comments)}
        </div>
    )
}

export default PostDetail;
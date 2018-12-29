import React from 'react'
import ContentDetailContainer from './ContentDetailContainer';
import CommentListContainer from '../../components/Comments/CommentListContainer';

const PostDetailPage = props => (
  <div className='p-0 m-0 w-full'>
    <ContentDetailContainer postId={props.match.params.postId} />
    <CommentListContainer
      postId={props.match.params.postId}
      commentId={props.match.params.commentId}
    />
  </div>
)

export default PostDetailPage
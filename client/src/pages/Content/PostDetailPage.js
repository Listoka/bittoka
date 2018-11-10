import React from 'react'
import ContentDetailContainer from './ContentDetailContainer';

const PostDetailPage = props => (
  <div className='p-0 m-0 w-full'>
    <ContentDetailContainer postId={props.match.params.postId} />
  </div>
)

export default PostDetailPage
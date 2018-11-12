import React from 'react'

const CommentListItem = props => {
  console.log('CommentListItem props: ', props)
  const margin = props.ancestors.length * 25
  return (
    <div className='border-grey border-l-2 p-2 text-sm' style={{ 'marginLeft': margin + 'px' }} >
      <p>_id: {props._id}</p>
      <p>parentComment: {props.parentComment}</p>
      <p>{props.body}</p>
      <p>Author: {props.author}</p>
    </div>
  )
}

export default CommentListItem
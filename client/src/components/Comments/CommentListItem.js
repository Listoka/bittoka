import React from 'react'

const CommentListItem = props => {
  const margin = props.ancestors.length * 25
  const handleCollapse = (event) => {
    event.preventDefault()
    props.handleCollapse(props._id, props.ancestors.length)
  }

  return (
    <div className='border-grey border-l-2 p-2 text-sm' style={{ 'marginLeft': margin + 'px' }} >
      <p>_id: {props._id}</p>
      <p>parentComment: {props.parentComment}</p>
      <p>Votes: {props.voters.length}</p>
      <p>{props.body}</p>
      <p>Author: {props.author}</p>
      <p>
        <a href='/collapse' onClick={handleCollapse}>[collapse]</a>
      </p>
    </div>
  )
}

export default CommentListItem
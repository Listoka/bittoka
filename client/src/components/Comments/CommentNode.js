import React from 'react'
import CommentList from './CommentList'
import CommentReplyForm from './CommentReplyForm'

const CommentNode = props => {
  const { _id, authorName, body, voters, replies, isCollapsed } = props
  const numVotes = (voters && voters.length) || 0

  if (!_id) {
    return (
      <div>
        <a href='/reply' onClick={props.toggleShowForm}>[reply]</a>
        {props.showForm &&
          <CommentReplyForm
            parentComment={_id}
            submitComment={props.submitComment}
            toggleShowForm={props.toggleShowForm}
          />}
      </div>
    )
  }

  if (isCollapsed) {
    return (
      <div className='text-sm bg-grey-lighter border-grey border-2 p-1 m-1'>
        <p>{numVotes} {authorName} <a href='/collapse' onClick={props.toggleCollapse}>[expand]</a></p>
      </div>
    )
  }

  return (
    <div>
      <div className='text-sm border-grey border-2 p-1 m-1'>
        <p>_id: {_id}</p>
        <p>votes: {numVotes}</p>
        <p>AuthorName: {authorName}</p>
        <p>body: {body}</p>
        <p>
          <a href='/reply' onClick={props.toggleShowForm}>[reply]</a>
          <a href='/collapse' onClick={props.toggleCollapse}>[collapse]</a>
        </p>
      </div>

      {props.showForm &&
        <CommentReplyForm
          parentComment={_id}
          submitComment={props.submitComment}
          toggleShowForm={props.toggleShowForm}
        />}

      {replies &&
        <CommentList
          submitComment={props.submitComment}
          comments={replies}
        />}
    </div>
  )
}

export default CommentNode
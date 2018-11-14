import React from 'react'
import CommentList from './CommentList'
import CommentReplyForm from './CommentReplyForm'
import AuthUserContext from '../AuthUserSession/AuthUserContext'

const CommentNode = props => {
  const { _id, authorName, body, voters, replies, isCollapsed } = props
  const numVotes = (voters && voters.length) || 0

  // if we don't get _id, then we're just using this component for its reply form
  // functionality at the 'root' CommentList. 
  if (!_id) {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          authUser &&
          <div>
            <a href='/reply' onClick={props.toggleShowForm}>[reply]</a>
            {props.showForm &&
              <CommentReplyForm
                parentComment={_id}
                submitComment={props.submitComment}
                toggleShowForm={props.toggleShowForm}
              />}
          </div>
        )}
      </AuthUserContext.Consumer>
    )
  }

  // if we're collapsed, show the minified version of the comment and no children
  if (isCollapsed) {
    return (
      <div className='text-sm bg-grey-lighter border-grey border-2 p-1 m-1'>
        <p>{numVotes} {authorName} <a href='/collapse' onClick={props.toggleCollapse}>[expand]</a></p>
      </div>
    )
  }

  // otherwise, return the default comment view and render the children comments
  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser => (
          <div className='text-sm border-grey border-2 p-1 m-1'>
            <p>_id: {_id}</p>
            <p>votes: {numVotes}</p>
            <p>AuthorName: {authorName}</p>
            <p>body: {body}</p>
            <p>
              {authUser && <a href='/reply' onClick={props.toggleShowForm}>[reply]</a>}
              <a href='/collapse' onClick={props.toggleCollapse}>[collapse]</a>
            </p>
          </div>

        )}
      </AuthUserContext.Consumer>

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
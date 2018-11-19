import React from 'react'
import CommentList from './CommentList'
import CommentReplyForm from './CommentReplyForm'
import AuthUserContext from '../AuthUserSession/AuthUserContext'
import CommentVoteButton from './CommentVoteButton';
import TextButton from '../Widgets/TextButton';
import { Link } from 'react-router-dom'

const CommentNode = props => {
  const { _id, authorName, body, voters, replies, isCollapsed, author } = props
  const numVotes = (voters && voters.length) || 0

  // if we're collapsed, show the minified version of the comment and no children
  if (isCollapsed) {
    return (
      <div
        onClick={props.toggleCollapse}
        className='text-sm bg-grey-lighter border-grey border-2 p-1 m-1 cursor-pointer'
      >
        <p>{numVotes} {authorName}</p>
      </div>
    )
  }

  // otherwise, return the default comment view and render the children comments
  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser => (
          <div className='flex text-sm border-grey border-2 m-1'>
            <div className='w-16 align-middle flex-none'>
              <CommentVoteButton
                addPendingVote={props.addPendingVote}
                removePendingVote={props.removePendingVote}
                pendingVotes={props.pendingVotes}
                authorName={authorName}
                _id={_id}
                voters={voters}
                numVotes={numVotes}
              />
            </div>
            <div className='p-1'>
              {/* <p className='text-xs font-bold'>{authorName}</p> */}
              <p><NameLink authorName={authorName} userId={author} /></p>
              <p>{body}</p>
              <p>
                {authUser && <TextButton text='[reply]' size='sm' onClick={props.toggleShowForm} />}
                <TextButton text='[collapse]' size='sm' onClick={props.toggleCollapse} />
              </p>
            </div>
          </div>

        )}
      </AuthUserContext.Consumer>

      {props.showForm &&
        <div className='mx-2 mb-2'>
          <CommentReplyForm
            parentComment={_id}
            submitComment={props.submitComment}
            toggleShowForm={props.toggleShowForm}
          />
        </div>}

      {replies &&
        <CommentList
          submitComment={props.submitComment}
          comments={replies}
          addPendingVote={props.addPendingVote}
          removePendingVote={props.removePendingVote}
          pendingVotes={props.pendingVotes}
        />}
    </div>
  )
}

const NameLink = props => (
  <Link
    to={`/users/${props.userId}`}
    className='no-underline hover:no-underline font-bold text-xs'
  >
    {props.authorName}
  </Link>
)

export default CommentNode
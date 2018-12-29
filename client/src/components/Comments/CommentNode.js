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

  // setCommentRef is drilled down all the way from CommentListContainer....
  let setCommentRef
  if (props.setCommentRef) {
    setCommentRef = el => props.setCommentRef(_id, el)
  } else {
    setCommentRef = el => console.log('No setCommentRef prop for el: ', el)
  }

  // if we're collapsed, show the minified version of the comment and no children
  if (isCollapsed) {
    return (
      <div
        onClick={props.toggleCollapse}
        className='text-light-gray text-sm bg-darkest-gray border-body-background border-2 p-1 m-1 cursor-pointer'
      >
        <p className='hover:text-brand-green'>{numVotes} {authorName}</p>
      </div>
    )
  }

  let divStyles
  if (props._id === props.selectedComment) {
    divStyles = 'flex text-sm border-red border-3 m-1'
  } else {
    divStyles = 'flex text-sm border-body-background border m-1'
  }
  // otherwise, return the default comment view and render the children comments
  return (
    <div ref={setCommentRef}>
      <AuthUserContext.Consumer>
        {authUser => (
          <div className={divStyles}>
            <div className='w-16 align-middle flex-none border-body-background'>
              <CommentVoteButton
                addPendingVote={props.addPendingVote}
                removePendingVote={props.removePendingVote}
                pendingVotes={props.pendingVotes}
                authorName={authorName}
                author={author}
                _id={_id}
                voters={voters}
                numVotes={numVotes}
              />
            </div>
            <div className='p-2'>
              <p><NameLink authorName={authorName} userId={author} /></p>
              <p className='text-sm text-light-gray my-2'>{body}</p>
              <p>
                {authUser &&
                  <React.Fragment>
                    <TextButton text='[reply]' size='xs' onClick={props.toggleShowForm} />
                    <span className='mr-1'></span>
                  </React.Fragment>}
                <TextButton text='[collapse]' size='xs' onClick={props.toggleCollapse} />
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
          setCommentRef={props.setCommentRef}
          selectedComment={props.selectedComment}
        />}
    </div>
  )
}

const NameLink = props => (
  <Link
    to={`/users/${props.userId}`}
    className='no-underline hover:no-underline text-brand-green text-xs'
  >
    {props.authorName}
  </Link>
)

export default CommentNode
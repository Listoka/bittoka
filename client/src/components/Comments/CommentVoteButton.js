import React from 'react'
import AuthUserContext from '../AuthUserSession/AuthUserContext';

const CommentVoteButton = props => {
  const voteIsPending = props.pendingVotes.some(v => v.commentId === props._id)
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        if (!authUser) {
          return (
            <div className='h-full text-center text-grey p-1'>
              <p className='text-base'>{props.numVotes}</p>
              <p className='text-xs'>[Login]</p>
            </div>
          )
        }

        if (voteIsPending) {
          return (
            <div
              onClick={() => props.removePendingVote(props._id)}
              className='h-full bg-blue-lighter text-center text-blue cursor-pointer p-1'
            >
              <p className='text-base'>{props.numVotes}</p>
              <p className='text-xs'>[...]</p>
            </div>
          )
        }

        const voteIsComplete = props.voters.includes(authUser.dbUser._id)
        if (voteIsComplete) {
          return (
            <div className='h-full text-center text-green p-1'>
              <p className='text-base'>{props.numVotes}</p>
              <p className='text-xs'>[Done!]</p>
            </div>
          )
        }

        return (
          <div
            className='h-full text-center text-grey cursor-pointer p-1 hover:bg-blue-lighter'
            onClick={() => props.addPendingVote(props._id, props.authorName, 0.03)}
          >
            <p className='text-base'>{props.numVotes}</p>
            <p className='text-xs'>[Vote]</p>
          </div>
        )

      }}
    </AuthUserContext.Consumer>

  )
}

export default CommentVoteButton
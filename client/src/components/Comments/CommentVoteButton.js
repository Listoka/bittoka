import React from 'react'
import AuthUserContext from '../AuthUserSession/AuthUserContext';
import ModalLaunchContext from '../Modals/ModalLaunchContext'

const CommentVoteButton = props => {
  const voteIsPending = props.pendingVotes.some(v => v.commentId === props._id)
  return (
    <AuthUserContext.Consumer>
      {authUser => {

        // If we're not logged in, make the vote button pop the login modal
        if (!authUser) {
          return (
            <ModalLaunchContext.Consumer>
              {openModal => (
                <div
                  onClick={(e) => openModal(e, 'LOGIN')}
                  className='h-full text-center text-grey p-1 cursor-pointer'
                >
                  <p className='text-base'>{props.numVotes}</p>
                  <p className='text-xs'>[Login]</p>
                </div>
              )}
            </ModalLaunchContext.Consumer>
          )
        }

        // Logged in and vote is queued for submission
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

        // Logged in and already voted for this comment
        const voteIsComplete = props.voters.includes(authUser.dbUser._id)
        if (voteIsComplete) {
          return (
            <div className='h-full text-center text-green p-1'>
              <p className='text-base'>{props.numVotes}</p>
              <p className='text-xs'>[Done!]</p>
            </div>
          )
        }

        // Logged in and haven't cast a vote yet
        return (
          <div
            className='h-full text-center text-grey-darker cursor-pointer p-1 hover:bg-blue-lighter'
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
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
                  className='h-full text-center text-light-gray p-1 cursor-pointer border-r border-body-background'
                >
                  <p className='text-base text-center'>{props.numVotes}</p>
                  <p className='text-xs text-medium-gray text-center'>[Login]</p>
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
              className='h-full bg-body-background text-brand-green text-center cursor-pointer pt-1 border border-brand-green'
            >
              <p className='text-base text-center'>{props.numVotes}</p>
              <p className='text-xs mr-1 pl-px text-center'><span className='pl-px'></span>[Pending]</p>
            </div>
          )
        }

        // Logged in and already voted for this comment
        const voteIsComplete = props.voters.includes(authUser.dbUser._id)
        if (voteIsComplete) {
          return (
            <div className='h-full text-center p-1 border-r border-body-background'>
              <p className='text-base text-light-gray text-center'>{props.numVotes}</p>
              <p className='text-xs text-medium-gray text-center'>[Voted]</p>
            </div>
          )
        }

        // Logged in and haven't cast a vote yet
        // TODO: Remove the hard-coded 0.03 cost
        return (
          <div
            className='h-full text-center text-light-gray cursor-pointer p-1 hover:text-brand-green hover:bg-body-background border-r border-body-background'
            onClick={() => props.addPendingVote(props._id, props.authorName, props.author, 0.03)}
          >
            <p className='text-base text-center'>{props.numVotes}</p>
            <p className='text-xs text-center'>[Vote]</p>
          </div>
        )

      }}
    </AuthUserContext.Consumer>

  )
}

export default CommentVoteButton
import React from 'react'
import ListokaMoneyButton from '.'
import AuthUserContext from '../AuthUserSession/AuthUserContext';

const UpvoteMoneyButton = props => {

  return (
    <AuthUserContext.Consumer>
      {authUser => {
        let voters = props.voters || []
        let voted = authUser && voters.includes(authUser.dbUser._id)
        return (
          authUser &&
          <React.Fragment>
          <hr className="mx-1 border-2 border-medium-gray hrModals"></hr>
          <div className=''>
            {voted
              ? <p className='text-xs mx-1'>Thanks for voting!</p>
              : (
                <React.Fragment>
                  <p className='text-xs mx-1 mb-2'>Upvote to support the author and help others find this content!</p>
                  <div className='flex mx-1'>
                    <ListokaMoneyButton
                      payVal={props.upVoteCost || '0.03'}
                      paymentSuccessCbk={props.afterUpvotePayment}
                      label='Upvote'
                      payeeId={props.payeeId}
                      userId={authUser.dbUser._id}
                      txType='post-vote'
                      postId={props.postId}
                    />
                  </div>
                </React.Fragment>
              )
            }
          </div>
          </React.Fragment>
        )
      }}
    </AuthUserContext.Consumer>
  )
}

export default UpvoteMoneyButton
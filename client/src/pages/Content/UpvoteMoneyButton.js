import React from 'react'
import ListokaMoneyButton from '../../components/ListokaMoneyButton'
import AuthUserContext from '../../components/AuthUserSession/AuthUserContext';

const UpvoteMoneyButton = props => {

  return (
    <AuthUserContext.Consumer>
      {authUser => {
        let voters = props.voters || []
        let voted = authUser && voters.includes(authUser.dbUser._id)
        return (
          authUser &&
          <div className='bg-grey-lighter m-4 p-2'>
            {voted
              ? <p className='text-xs text-center m-1'>Thanks for voting!</p>
              : (
                <React.Fragment>
                  <p className='text-xs text-center m-1'>Upvote this content to help others find it!</p>
                  <div className='flex justify-center'>
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
        )
      }}
    </AuthUserContext.Consumer>
  )
}

export default UpvoteMoneyButton
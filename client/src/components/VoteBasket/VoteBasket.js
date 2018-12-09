import React from 'react'
import { List } from '../List';
import ListokaMoneyButton from '../ListokaMoneyButton';
import AuthUserContext from '../AuthUserSession/AuthUserContext';

const VoteBasket = props => {
  const { pendingVotes } = props
  const numPendingVotes = (pendingVotes && pendingVotes.length) || 0
  // const totalCost = (pendingVotes && pendingVotes.reduce((acc, v) => acc + v.cost, 0)) || 0

  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser &&
        <div className='absolute pin-b pin-r w-1/5 mr-8 border-t border-r border-l border-lightest-gray bg-darkest-gray'>
          <div onClick={props.toggleIsCollapsed} className='bg-soft-black cursor-pointer'>
            <div className='text-base text-center text-light-gray p-2'>Pending Votes ({numPendingVotes})</div>
          </div>
          {!props.isCollapsed &&
            <div className='bg-darkest-gray mt-1'>
              <PendingVoteList {...props} />
              <div className='bg-darkest-gray text-sm text-light-gray'>
              <hr className="mb-2 mx-2 border-brand-green border-2 hrModals"></hr>
                {/* TODO: use props.submitVotes to finalize and purchase */}
                {/* <p className='p-1'>Cost: <span className='text-brand-green'>${totalCost.toFixed(2)}</span></p> */}
                <div className='flex m-2'>
                <ListokaMoneyButton
                  payeeArray={pendingVotes}
                  label='Vote!'
                  payVal={0.03}
                  txType='comment-vote'
                  userId={authUser.dbUser._id}
                  paymentSuccessCbk={props.submitAndCollapse}
                />
                </div>
              </div>
            </div>}
        </div>}
    </AuthUserContext.Consumer>
  )
}

const PendingVoteList = props => {
  const { pendingVotes, ...other } = props
  return (
    <List
      data={pendingVotes}
      keyProp='commentId'
      component={PendingVoteListItem}
      className='none'
      {...other}
    />
  )
}

const PendingVoteListItem = props => {
  return (
    <div className='text-light-gray p-1 px-2 text-sm hover:bg-dark-green'>
      {props.authorName}
      <span
        className='text-xs text-red float-right cursor-pointer'
        onClick={() => props.removePendingVote(props.commentId)}>
        [remove]
      </span>
    </div>
  )
}

export default VoteBasket
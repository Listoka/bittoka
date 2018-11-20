import React from 'react'
import { List } from '../List';
// import ListokaMoneyButton from '../ListokaMoneyButton'

const VoteBasket = props => {
  const { pendingVotes } = props
  const numPendingVotes = (pendingVotes && pendingVotes.length) || 0
  const totalCost = (pendingVotes && pendingVotes.reduce((acc, v) => acc + v.cost, 0)) || 0

  return (
    <div className='absolute pin-b pin-r w-1/4 mr-4 border'>
      <div onClick={props.toggleIsCollapsed} className='bg-grey-darker cursor-pointer'>
        <h5 className='text-base text-center text-grey-lighter p-2'>Pending Votes ({numPendingVotes})</h5>
      </div>
      {!props.isCollapsed &&
        <div className='bg-white'>
          <PendingVoteList {...props} />
          <div className='bg-grey-lighter text-sm'>
            {/* TODO: use props.submitVotes to finalize and purchase */}
            <p className='p-1'>Cost: ${totalCost.toFixed(2)}</p>
          </div>
        </div>}
    </div>
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
    <div className='p-1 text-sm hover:bg-grey-lighter'>
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
import React from 'react'
import { List } from '../List';
// import ListokaMoneyButton from '../ListokaMoneyButton'

const VoteBasket = props => {
  const { pendingVotes } = props
  const numPendingVotes = (pendingVotes && pendingVotes.length) || 0
  const totalCost = (pendingVotes && pendingVotes.reduce((acc, v) => acc + v.cost, 0)) || 0

  return (
    <div className='absolute pin-b pin-r w-1/4 mr-4 border-t border-r border-l border-white'>
      <div onClick={props.toggleIsCollapsed} className='bg-soft-black cursor-pointer'>
        <div className='text-base text-center text-white p-2'>Pending Votes ({numPendingVotes})</div>
      </div>
      {!props.isCollapsed &&
        <div className='bg-darkest-gray'>
          <PendingVoteList {...props} />
          
          <div className='bg-darkest-gray text-sm text-white border-t border-b border-white'>
            {/* TODO: use props.submitVotes to finalize and purchase */}
            <p className='p-1'>Cost: <span className='text-brand-green'>${totalCost.toFixed(2)}</span></p>
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
    <div className='text-white p-1 text-sm hover:bg-dark-green'>
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
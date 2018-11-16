import React from 'react'
import List from '../Widgets/List';

const VoteBasket = props => {
  const numPendingVotes = (props.pendingVotes && props.pendingVotes.length) || 0
  return (
    <div className='absolute pin-b pin-r w-1/4 mr-4 border'>
      <div onClick={props.toggleIsCollapsed} className='bg-grey-darker'>
        <h5 className='text-base text-center text-grey-lighter p-2'>Pending Votes ({numPendingVotes})</h5>
      </div>
      {!props.isCollapsed &&
        <div className='bg-white'>
          <p>pending vote list</p>
        </div>}
    </div>
  )
}

const PendingVoteList = props => {
  return (
    <List
      data={props.pendingVotes}
      keyProp='commentId'
      component={PendingVoteListItem}
    />
  )
}

export default VoteBasket
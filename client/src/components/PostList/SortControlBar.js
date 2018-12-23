import React from 'react'

const SortControlBar = props => {
  return (
    <div className='text-sm rounded-lg container w-full max-w-lg bg-darkest-gray px-2 mb-4'>
      <div className='flex'>
        <ControlButton active={props.sortType === 'votes'} onClick={props.setSortVotes}>
          Votes
        </ControlButton>
        <ControlButton active={props.sortType === 'time'} onClick={props.setSortTime}>
          Newest
        </ControlButton>

        <span className='border-l border-1 border-medium-gray-darker'></span>

        <ControlButton active={props.sortOrder === 'desc'} onClick={props.setSortDesc}>
          <i className='fas fa-long-arrow-alt-down ml-1'></i>
        </ControlButton>
        <ControlButton active={props.sortOrder === 'asc'} onClick={props.setSortAsc}>
          <i className='fas fa-long-arrow-alt-up'></i>
        </ControlButton>

        {props.sortType === 'votes' &&
          <React.Fragment>
            <span className='border-l border-1 border-medium-gray-darker'></span>
            <ControlButton active={props.days === 7} onClick={() => props.setSortDays(7)}>Week</ControlButton>
            <ControlButton active={props.days === 30} onClick={() => props.setSortDays(30)}>Month</ControlButton>
            <ControlButton active={!props.days} onClick={() => props.setSortDays(null)}>All-Time</ControlButton>
          </React.Fragment>}
      </div>
    </div>
  )
}

export default SortControlBar

const ControlButton = props => {
  let className = 'mx-1 cursor-pointer px-2 py-3'
  if (props.active) {
    className += ' text-brand-green'
  } else {
    className += ' bg-darkest-gray text-white hover:text-brand-green'
  }
  return (
    <span className={className} onClick={props.onClick}>{props.children}</span>
  )
}
import React from 'react'

const Sidebar = props => {
  return (
    <div className='bg-white border-grey rounded p-1 m-1'>
      {props.children}
    </div>
  )
}

export default Sidebar
import React from 'react'

const Sidebar = props => {
  return (
    <div className='rounded-lg bg-darkest-gray mb-2 p-4'>
      {props.children}
    </div>
  )
}

export default Sidebar
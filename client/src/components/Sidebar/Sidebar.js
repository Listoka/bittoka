import React from 'react'

const Sidebar = props => {
  return (
    <div className='rounded-lg bg-darkest-gray mb-5 p-5'>
      {props.children}
    </div>
  )
}

export default Sidebar
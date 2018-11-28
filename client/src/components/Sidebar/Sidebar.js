import React from 'react'

const Sidebar = props => {
  return (
    <div className='rounded-8px bg-darkest-gray mb-20px p-40px'>
      {props.children}
    </div>
  )
}

export default Sidebar
import React from 'react'

const StyleButton = props => {
  const onToggle = e => {
    e.preventDefault()
    props.onToggle(props.style)
  }

  let className = props.active ? 'bg-blue-lighter' : 'bg-grey'
  className += ' px-2 py-1 text-grey-darker cursor-pointer flex-none'

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  )
}

export default StyleButton
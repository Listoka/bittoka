import React from 'react'

// Currently used in the comments components
const TextButton = props => {
  const { onClick, text } = props

  // tied directly to tailwind size styles 'sm', 'lg', '3xl', etc.
  const size = props.size || 'base'
  const color = props.color || 'text-medium-gray'

  return (
    <span
      onClick={onClick}
      className={`text-${size} ${color} bg-transparent active:text-brand-green hover:text-brand-green cursor-pointer select-none`}
    >
      {text}
    </span>
  )
}

export default TextButton
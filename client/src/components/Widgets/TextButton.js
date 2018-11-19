import React from 'react'

// Currently used in the comments components
const TextButton = props => {
  const { onClick, text } = props

  // tied directly to tailwind size styles 'sm', 'lg', '3xl', etc.
  const size = props.size || 'base'

  return (
    <span
      onClick={onClick}
      className={`text-${size} text-blue hover:text-blue-dark mr-1 cursor-pointer select-none`}
    >
      {text}
    </span>
  )
}

export default TextButton
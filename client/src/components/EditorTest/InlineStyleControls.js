import React from 'react'
import StyleButton from './StyleButton'

const INLINE_STYLES = [
  { label: 'bold', style: 'BOLD' },
  { label: 'italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
]

const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle()
  return (
    <div className='flex bg-grey-light z-50'>
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          label={type.label}
          active={currentStyle.has(type.style)}
          style={type.style}
          onToggle={props.onToggle}
        />
      ))}
    </div>
  )
}

export default InlineStyleControls
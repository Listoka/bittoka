import React from 'react'
import StyleButton from './StyleButton'

const INLINE_STYLES = [
  { label: 'bold', style: 'BOLD' },
  { label: 'italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
]

class InlineToolbar extends React.Component {

  render() {
    if (!this.props.isVisible) return null
    const currentStyle = this.props.editorState.getCurrentInlineStyle()
    return (
      <div style={{ ...this.props.position }} className='absolute z-50'>
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            label={type.label}
            active={currentStyle.has(type.style)}
            style={type.style}
            onToggle={this.props.onToggle}
          />
        )}
      </div>
    )
  }
}

export default InlineToolbar
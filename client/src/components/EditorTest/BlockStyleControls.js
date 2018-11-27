import React from 'react'
import StyleButton from './StyleButton'

const BLOCK_TYPES = [
  { label: 'H2', style: 'header-two' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
]

export function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'italic mx-10 my-2 border-l-4 border-grey-darker p-2';
    case 'header-two': return 'text-black'
    case 'code-block': return 'mx-10 '
    default: return null;
  }
}

export const BlockStyleControls = props => {
  const { editorState } = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className='flex bg-grey-light'>
      {BLOCK_TYPES.map(type =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default BlockStyleControls
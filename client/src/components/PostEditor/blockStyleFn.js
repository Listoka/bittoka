// use this function to apply css classes to blocks within the editor
// Usage:  <Editor blockStyleFn={blockStyleFn} ... />

export default function blockStyleFn(block) {
  switch (block.getType()) {
    case 'blockquote': return 'italic mx-10 border-l-4 border-grey-darker p-2';
    case 'header-two': return 'text-black'
    case 'code-block': return 'mx-10 p-2 bg-grey-lighter'
    default: return null;
  }
}
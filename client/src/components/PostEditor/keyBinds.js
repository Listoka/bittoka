import { RichUtils, getDefaultKeyBinding/*, KeyBindingUtil*/ } from 'draft-js';
// const {hasCommandModifier} = KeyBindingUtil;

export function keyBindingFn(e) {
  // if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
  //   return 'myeditor-save';
  // }
  if (e.keyCode === 9) {
    const newEditorState = RichUtils.onTab(
      e,
      this.state.editorState,
      4, /* maxDepth */
    );
    if (newEditorState !== this.state.editorState) {
      this.onChange(newEditorState);
    }
    return 'tab'
  }
  return getDefaultKeyBinding(e);
}

export function handleKeyCommand(command) {
  // if (command === 'myeditor-save') {
  //   // Perform a request to save your contents, set
  //   // a new `editorState`, etc.
  //   return 'handled';
  // }
  if (command === 'tab') {
    return 'handled'
  }
  return 'not-handled';
}
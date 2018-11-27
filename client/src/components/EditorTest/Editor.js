import React from 'react'
import { Editor, EditorState, RichUtils, CompositeDecorator, getVisibleSelectionRect } from 'draft-js'
import InlineStyleControls from './InlineStyleControls'
import BlockStyleControls, { getBlockStyle } from './BlockStyleControls'
import InlineToolbar from './InlineToolbar'

class TestEditor extends React.Component {
  constructor(props) {
    super(props)

    const decorator = new CompositeDecorator([
      { strategy: findLinkEntities, component: ELink }
    ])

    this.state = {
      editorState: EditorState.createEmpty(decorator),
      showUrlInput: false,
      urlValue: '',
      inlineToolbarVisible: false,
      inlineToolbarPosition: null,
    }
  }

  onChange = editorState => {
    const selection = editorState.getSelection()
    this.inlineToolbarFn(selection)
    this.setState({ editorState })
  }

  inlineToolbarFn = (selection) => {
    if (selection.isCollapsed()) {
      this.setState({ inlineToolbarVisible: false })
      return
    }

    setTimeout(() => {
      const toolbar = this.refs.inlineToolbar
      if (!toolbar) return

      const editorRef = this.refs.editor
      if (!editorRef) return

      const editorRect = editorRef.editor.getBoundingClientRect()

      const selectionRect = getVisibleSelectionRect(window)
      if (!selectionRect) return

      // TODO: figure out a better way to do positioning that doesn't rely on some magic numbers
      const inlineToolbarPosition = {
        top: selectionRect.top - 30,
        left: selectionRect.left - editorRect.left + (selectionRect.width / 2) + 40
      }

      this.setState({ inlineToolbarPosition, inlineToolbarVisible: true })
    }, 0)
  }

  onURLChange = e => this.setState({ urlValue: e.target.value })
  focus = () => this.refs.editor.focus()

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    )
  }

  toggleBlockType = blockType => {
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    )
  }

  promptForLink = e => {
    e.preventDefault()
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      this.setState({
        showURLInput: true,
        urlValue: url,
      }, () => {
        setTimeout(() => this.refs.url.focus(), 0);
      });
    }
  }

  confirmLink = e => {
    e.preventDefault();
    const { editorState, urlValue } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.refs.editor.focus(), 0);
    });
  }

  onLinkInputKeyDown = e => {
    if (e.which === 13) {
      this.confirmLink(e)
    }
  }

  removeLink = e => {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    }
  }

  render() {
    let urlInput;
    if (this.state.showURLInput) {
      urlInput =
        <div className='mb-3'>
          <input
            className='mr-2 p-1'
            onChange={this.onURLChange}
            ref="url"
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown}
          />
          <button onMouseDown={this.confirmLink}>
            Confirm
          </button>
        </div>;
    }

    return (
      <div>
        <InlineStyleControls
          onToggle={this.toggleInlineStyle}
          editorState={this.state.editorState}
        />
        <BlockStyleControls
          onToggle={this.toggleBlockType}
          editorState={this.state.editorState}
        />
        <div><button onMouseDown={this.promptForLink}>Add Link</button></div>
        {urlInput}
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          blockStyleFn={getBlockStyle}
          ref='editor'
        />
        <InlineToolbar
          ref='inlineToolbar'
          editorState={this.state.editorState}
          position={this.state.inlineToolbarPosition}
          isVisible={this.state.inlineToolbarVisible}
          onToggle={this.toggleInlineStyle}
        />
      </div>
    )
  }
}

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const ELink = props => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} className='text-blue no-underline hover:text-blue-dark cursor-pointer'>
      {props.children}
    </a>
  );
};

export default TestEditor
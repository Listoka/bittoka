import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createDividerPlugin from 'draft-js-divider-plugin';
import createCounterPlugin from 'draft-js-counter-plugin';
import createVideoPlugin from 'draft-js-video-plugin';
import {
  ItalicButton, BoldButton, UnderlineButton, CodeButton, HeadlineTwoButton,
  HeadlineThreeButton, UnorderedListButton, OrderedListButton, BlockquoteButton, CodeBlockButton,
} from 'draft-js-buttons';
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import '../../../node_modules/draft-js-side-toolbar-plugin/lib/plugin.css'
import ImageAdd from './AddImage.js';
import VideoAdd from './VideoAdd.js';
import './styles.css';

// Adding the plugins
const inlineToolbarPlugin = createInlineToolbarPlugin();
const undoPlugin = createUndoPlugin();
const imagePlugin = createImagePlugin();
const sideToolbarPlugin = createSideToolbarPlugin();
const linkPlugin = createLinkPlugin();
const dividerPlugin = createDividerPlugin();
const counterPlugin = createCounterPlugin();
const videoPlugin = createVideoPlugin();

const { InlineToolbar } = inlineToolbarPlugin;
const { UndoButton } = undoPlugin;
const { SideToolbar } = sideToolbarPlugin;
const { DividerButton } = dividerPlugin;
const { WordCounter } = counterPlugin;

const plugins = [
  inlineToolbarPlugin, undoPlugin, imagePlugin, sideToolbarPlugin,
  linkPlugin, dividerPlugin, counterPlugin, videoPlugin
];

// const styleMap = {
//   CODE: {
//     backgroundColor: 'blue',
//     fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//     fontSize: 32,
//     padding: 2,
//   },
// };

class TextEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
    <React.Fragment>
      {/* Should we even have an undo/redo button? */}
      <div className='float-right mr-2'>
        <UndoButton />
      </div>
      
      <div className='editor' onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          // customStyleMap={styleMap}
          ref={(element) => { this.editor = element; }}
        />
        <SideToolbar>
          {externalProps => (
            <React.Fragment>
              <DividerButton {...externalProps} />
            </React.Fragment>
          )}
        </SideToolbar>
        <InlineToolbar>
          {externalProps => (
              <React.Fragment>
                {console.log(externalProps)}
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <HeadlineThreeButton {...externalProps} />
                <Separator {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <linkPlugin.LinkButton {...externalProps} />
                
                {/* <VideoAdd
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  modifier={videoPlugin.addVideo}
                /> */}
              </React.Fragment>
          )}
        </InlineToolbar>
      </div>
       
        <ImageAdd
            editorState={this.state.editorState}
            onChange={this.onChange}
            modifier={imagePlugin.addImage}
        />
      <div className='float-right -mt-5'><WordCounter /> words</div>
    </React.Fragment>
    )
  }
}

export default TextEditor;
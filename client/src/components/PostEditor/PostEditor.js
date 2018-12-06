import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin /*, { Separator }*/ from 'draft-js-inline-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createCounterPlugin from 'draft-js-counter-plugin';
import blockStyleFn from './blockStyleFn'
// import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
// import createImagePlugin from 'draft-js-image-plugin';
// import createDividerPlugin from 'draft-js-divider-plugin';
// import createVideoPlugin from 'draft-js-video-plugin';

import {
  ItalicButton, BoldButton, UnderlineButton, CodeButton, HeadlineTwoButton,
  UnorderedListButton, OrderedListButton, BlockquoteButton, CodeBlockButton,
} from 'draft-js-buttons';

// import ImageAdd from './AddImage.js';
// import VideoAdd from './VideoAdd.js';

import { /*sideToolbarTheme,*/ inlineToolbarTheme, linkTheme, editorTheme } from './themes'

// Adding the plugins
const inlineToolbarPlugin = createInlineToolbarPlugin({ theme: inlineToolbarTheme });
const linkPlugin = createLinkPlugin({ theme: linkTheme, placeholder: 'http://' });
const counterPlugin = createCounterPlugin();
// const sideToolbarPlugin = createSideToolbarPlugin({ theme: sideToolbarTheme });
// const imagePlugin = createImagePlugin();
// const dividerPlugin = createDividerPlugin();
// const videoPlugin = createVideoPlugin();

const { InlineToolbar } = inlineToolbarPlugin;
const { WordCounter } = counterPlugin;
// const { DividerButton } = dividerPlugin;
// const { SideToolbar } = sideToolbarPlugin;

const plugins = [
  inlineToolbarPlugin,
  linkPlugin,
  counterPlugin,
  // imagePlugin,
  // sideToolbarPlugin,
  // dividerPlugin,
  // videoPlugin
];

class PostEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }

  onChange = (editorState) => this.setState({ editorState })
  focus = () => this.editor.focus();

  render() {
    const { editorState, onChange } = this.props

    return (
      <React.Fragment>
        <div className={editorTheme.editor} onClick={this.focus}>
          <Editor
            editorState={editorState ? editorState : this.state.editorState}
            onChange={onChange ? onChange : this.onChange}
            plugins={plugins}
            blockStyleFn={blockStyleFn}
            ref={(element) => { this.editor = element; }}
          // customStyleMap={styleMap}
          />
          {/* <SideToolbar>
            {externalProps => (
              <React.Fragment>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <VideoAdd {...externalProps} />
                <ImageAdd {...externalProps} />
                <DividerButton {...externalProps} />
              </React.Fragment>
            )}
          </SideToolbar> */}
          <InlineToolbar>
            {externalProps => (
              <React.Fragment>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <linkPlugin.LinkButton {...externalProps} />
                <HeadlineTwoButton {...externalProps} />
                {/* <Separator {...externalProps} /> */}
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
              </React.Fragment>
            )}
          </InlineToolbar>
        </div>

        {/* <ImageAdd
          editorState={this.state.editorState}
          onChange={this.onChange}
          modifier={imagePlugin.addImage}
        /> */}
        {/* <VideoAdd
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  modifier={videoPlugin.addVideo}
                /> */}
        <div className='float-right -mt-5'><WordCounter /> words</div>
      </React.Fragment>
    )
  }
}

export default PostEditor;
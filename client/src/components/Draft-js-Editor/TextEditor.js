import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createDividerPlugin from 'draft-js-divider-plugin';
import createCounterPlugin from 'draft-js-counter-plugin';
import createVideoPlugin from 'draft-js-video-plugin';

import {
  ItalicButton, BoldButton, UnderlineButton, CodeButton, HeadlineTwoButton,
  HeadlineThreeButton, UnorderedListButton, OrderedListButton, BlockquoteButton, CodeBlockButton,
} from 'draft-js-buttons';

import ImageAdd from './AddImage.js';
import VideoAdd from './VideoAdd.js';

import { sideToolbarTheme, inlineToolbarTheme, linkTheme, editorTheme } from './themes'

// Adding the plugins
const inlineToolbarPlugin = createInlineToolbarPlugin({ theme: inlineToolbarTheme });
const sideToolbarPlugin = createSideToolbarPlugin({ theme: sideToolbarTheme });
const linkPlugin = createLinkPlugin({ theme: linkTheme, placeholder: 'http://' });
const imagePlugin = createImagePlugin();
const dividerPlugin = createDividerPlugin();
const counterPlugin = createCounterPlugin();
const videoPlugin = createVideoPlugin();

const { InlineToolbar } = inlineToolbarPlugin;
const { DividerButton } = dividerPlugin;
const { SideToolbar } = sideToolbarPlugin;
const { WordCounter } = counterPlugin;

const plugins = [
  inlineToolbarPlugin, imagePlugin, sideToolbarPlugin,
  linkPlugin, dividerPlugin, counterPlugin, videoPlugin
];

class TextEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }

  onChange = (editorState) => this.setState({ editorState })
  focus = () => this.editor.focus();

  render() {
    return (
      <React.Fragment>
        <div className={editorTheme.editor} onClick={this.focus}>
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
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <VideoAdd {...externalProps} />
                <ImageAdd {...externalProps} />
                <DividerButton {...externalProps} />
              </React.Fragment>
            )}
          </SideToolbar>
          <InlineToolbar>
            {externalProps => (
              <React.Fragment>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <HeadlineThreeButton {...externalProps} />
                {/* <Separator {...externalProps} /> */}
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <linkPlugin.LinkButton {...externalProps} />
              </React.Fragment>
            )}
          </InlineToolbar>
        </div>

        <ImageAdd
          editorState={this.state.editorState}
          onChange={this.onChange}
          modifier={imagePlugin.addImage}
        />
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

export default TextEditor;
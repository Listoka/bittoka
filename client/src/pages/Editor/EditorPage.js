import React from 'react'
import PostEditor from '../../components/PostEditor/PostEditor'
import ModalLaunchContext from '../../components/Modals/ModalLaunchContext'
import { B } from '../../components/Widgets';

const EditorPage = props => {
  return (
    <div className='mx-auto max-w-md h-full'>
      <div className='flex my-2'>
        <input
          type='text'
          name='title'
          placeholder='Title...'
          className='flex-1 min-w-0 rounded-sm border-none shadow-inner block text-5xl p-2'
          value={props.title}
          onChange={props.onTitleChange}
          disabled={!props.isDraft}
        />
      </div>
      {/* TODO: Pull this into its own collapsing menu component */}
      <div className='flex flex-col bg-white absolute pin-r w-32 pt-1'>
        {props.isDraft &&
          <B onClick={props.saveDraft} className='bg-grey hover:bg-blue-light mb-1 mx-1 px-2 py-1'>
            Save Draft
          </B>}
        <ModalLaunchContext.Consumer>
          {openModal => (
            <B
              onClick={(e) => openModal(e, 'PUBLISH-POST', props)}
              className='bg-grey hover:bg-blue-light mb-1 mx-1 px-2 py-1'
            >
              Settings
            </B>
          )}
        </ModalLaunchContext.Consumer>
        <B
          onClick={props.publishPost}
          className='bg-grey hover:bg-blue-light mb-1 mx-1 px-2 py-1'
          disabled={!props.readyToPublish}
        >
          Publish
        </B>
      </div>
      <PostEditor
        onChange={props.onEditorChange}
        editorState={props.editorState}
      />
    </div>
  )
}

export default EditorPage
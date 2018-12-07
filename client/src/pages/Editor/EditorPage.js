import React from 'react'
import PostEditor from '../../components/PostEditor/PostEditor'
import ModalLaunchContext from '../../components/Modals/ModalLaunchContext'
import { B } from '../../components/Widgets';

const EditorPage = props => {
  return (
    <React.Fragment>
      <div className='mb-8'>
      </div>
      <div className='max-w-lg mx-auto rounded h-full bg-body-background'>
      <div className='mx-auto max-w-lg h-full p-px px-1 rounded'>
      
        <div className='flex my-1'>
          <input
            type='text'
            name='title'
            placeholder='Title...'
            className='flex-1 min-w-0 border-none shadow-inner block text-4xl p-2 mb-0 rounded bg-white text-soft-black'
            value={props.title}
            onChange={props.onTitleChange}
            disabled={!props.isDraft}
          />
        </div>
        {/* TODO: Pull this into its own collapsing menu component */}
        <div className='flex flex-col bg-body-background absolute pin-r w-32 pt-1 rounded-l'>
          {props.isDraft &&
            <B onClick={props.saveDraft} className='bg-soft-black text-white hover:bg-brand-green mb-1 mx-1 px-2 py-1 rounded'>
              Save Draft
            </B>}
          <ModalLaunchContext.Consumer>
            {openModal => (
              <B
                onClick={(e) => openModal(e, 'PUBLISH-POST', props)}
                className='bg-soft-black text-white hover:bg-brand-green mb-1 mx-1 px-2 py-1 rounded'
              >
                Publish
              </B>
            )}
          </ModalLaunchContext.Consumer>
        </div>
        <PostEditor
          onChange={props.onEditorChange}
          editorState={props.editorState}
        />
      </div>
      </div>
      </React.Fragment>
  )
}

export default EditorPage
import React from 'react'
import PostEditor from '../../components/PostEditor/PostEditor'
import ModalLaunchContext from '../../components/Modals/ModalLaunchContext'
import { B } from '../../components/Widgets';

const EditorPage = props => {
  return (
    <React.Fragment>
      <div className='mb-8'>
      </div>
      <div className='max-w-md mx-auto rounded h-full'>
        <div className='mx-auto max-w-md h-full p-px px-1 rounded'>
          <div className='flex my-1'>
            <input
              type='text'
              name='title'
              placeholder='Title...'
              className='flex-1 block min-w-0 mb-10px p-2 mb-0 rounded border-0 border-b border-b-mack-the-knife outline-none bg-soft-black text-3xl text-light-gray'
              value={props.title}
              onChange={props.onTitleChange}
              disabled={!props.isDraft}
            />
          </div>
          {/* TODO: Pull this into its own collapsing menu component */}
          <div className='flex flex-col absolute pin-r w-32 pt-1 rounded-l mt-3'>
            {props.isDraft &&
              <B
                onClick={props.saveDraft}
                className='bg-light-gray text-sm text-soft-black border-0 border-soft-black hover:bg-brand-green mb-1 mx-1 px-2 py-1 rounded'
                disabled={props.savePending}
              >
                {props.savePending ? 'Saving...' : 'Save Draft'}
              </B>}
            <ModalLaunchContext.Consumer>
              {openModal => (
                <B
                  onClick={(e) => openModal(e, 'PUBLISH-POST', props)}
                  className='bg-light-gray text-sm text-soft-black border-0 border-soft-black hover:bg-brand-green mb-1 mx-1 px-2 py-1 rounded'
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
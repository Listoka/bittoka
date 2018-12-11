import React from 'react'
import { List } from '../List'
import CommentNodeContainer from './CommentNodeContainer'
import CommentListHeader from './CommentListHeader';

const CommentList = props => {
  const { comments, ...rest } = props
  comments.sort(compareVotersDesc)
// This is the subcomments styling.
  let classes = 'bg-darkest-gray border-l border-medium-gray ml-3 mb-3'

  // this component is used in 2 different, but very similar ways.
  // if it is the 'root' or base container, we want a different set 
  // of styles than if it is an 'embedded' instance of the list
  if (props.root) {
    classes = 'max-w-2xl md:w-5/6 lg:w-4/5 bg-darkest-gray rounded mx-auto mt-3 pb-px mb-3'
  }

  return (
    <div className={classes}>
      {/* {props.root && <CommentNodeContainer submitComment={props.submitComment} />} */}
      {props.root && <CommentListHeader submitComment={props.submitComment} />}
      <List
        data={comments}
        keyProp='_id'
        component={CommentNodeContainer}
        className='none'
        {...rest}
      />
    </div>
  )
}

// desc order by num voters
function compareVotersDesc(node1, node2) {
  return node2.voters.length - node1.voters.length
}

export default CommentList
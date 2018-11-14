import React from 'react'
import List from '../Widgets/List'
import CommentListItem from './CommentListItem'
import CommentNodeContainer from './CommentNodeContainer'

const CommentList = props => {
  const comments = props.comments.sort(compareVotersDesc)
  return (
    // props.data &&
    // <div className='bg-white rounded w-4/5 mx-auto my-4'>
    <List
      data={comments}
      keyProp='_id'
      component={CommentNodeContainer}
      className='bg-white border-l border-grey ml-3'
      submitComment={props.submitComment}
    // 'w-4/5 bg-white p1 rounded mx-auto mt-3'
    />
    // </div>
    // <div className='bg-white rounded w-4/5 mx-auto my-4'>
    //   <List
    //     data={props.comments}
    //     keyProp='_id'
    //     component={CommentListItem}
    //     handleCollapse={props.handleCollapse}
    //   />
    // </div>
  )
}

// desc order by num voters
function compareVotersDesc(node1, node2) {
  return node2.voters.length - node1.voters.length
}

export default CommentList
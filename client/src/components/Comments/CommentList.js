import React from 'react'
import List from '../Widgets/List'
import CommentListItem from './CommentListItem'

const CommentList = props => {
  return (
    <div className='bg-white rounded w-4/5 mx-auto my-4 p-2'>
      <p>CommentList</p>
      <List data={props.comments} keyProp='_id' component={CommentListItem} />
    </div>
  )
}

export default CommentList
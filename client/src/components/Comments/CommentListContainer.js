import React from 'react'
import API from '../../utils/API'
import CommentList from './CommentList';
import makeTreeList from '../../utils/makeTreeList'

// do the thing and grab all the comments for the associated post.
// we get the the post id passed in as a prop, then make hte network requests.

class CommentListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortedComments: []
    }
  }

  comments = []
  commentMap = {}

  componentDidMount() {
    this.fetchComments()
  }

  fetchComments() {
    return API.getAllPostComments(this.props.postId)
      .then(response => {
        console.log('fetchComments response: ', response)
        this.comments = response.data
      })
      .catch(err => console.log('fetchComments Err: ', err))
  }

  sortComments() {
    const treeList = makeTreeList(this.comments, '_id', 'parentComment', 'replies', this.commentMap)
    const sortedComments = flatten(treeList)
    this.setState({ sortedComments })
  }

  render() {
    return <CommentList {...this.state} />
  }
}

export default CommentListContainer
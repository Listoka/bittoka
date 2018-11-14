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
      treeList: []
    }
  }

  comments = []

  componentDidMount() {
    this.fetchComments()
      .then(() => this.sortComments())
  }

  fetchComments() {
    return API.getAllPostComments(this.props.postId)
      .then(response => this.comments = response.data)
      .catch(err => console.log('fetchComments Err: ', err))
  }

  sortComments() {
    const treeList = makeTreeList(this.comments, '_id', 'parentComment', 'replies')
    this.setState({ treeList })
  }

  collapseComment = (commentId, depth) => {
    const comments = this.state.displayedComments.filter(comment => {
      if (comment.ancestors.length <= depth) return true
      if (!comment.ancestors.includes(commentId)) return true
    })

    this.setState({ displayedComments: comments })
  }

  // a better way to handle this might be to not actually fetch and sort right away
  // instead, we could just add the comment directly to the list and submit the comment in the background
  submitComment = data => {
    API.createComment(this.props.postId, data)
      .then(result => console.log('submitComment result: ', result))
      .then(() => this.fetchComments())
      .then(() => this.sortComments())
  }

  render() {
    return (
      <CommentList
        comments={this.state.treeList}
        submitComment={this.submitComment}
        root
      />
    )
  }
}

// another option would be to build a tree to sort the comments then flatten it to make
// rendering a lot of comments faster..

// // desc order by num voters
// function compareVotersDesc(node1, node2) {
//   return node2.voters.length - node1.voters.length
// }

// // where treeList is an array of trees
// function flatten(treeList, childrenKey, collection, compareFunc) {
//   if (!treeList || treeList.length === 0) return
//   treeList.sort(compareFunc)
//   for (let node of treeList) {
//     collection.push(node)
//     flatten(node[childrenKey], childrenKey, collection)
//   }
// }

export default CommentListContainer
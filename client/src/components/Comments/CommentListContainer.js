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
      .then(() => this.sortComments())
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
    console.log('treeList: ', treeList)
    const sortedComments = []
    flatten(treeList, 'replies', sortedComments, compareVotersDesc)
    this.setState({ sortedComments })
  }

  render() {
    return <CommentList comments={this.state.sortedComments} />
  }
}

// desc order by num voters
function compareVotersDesc(node1, node2) {
  return node2.voters.length - node1.voters.length
}

// where treeList is an array of trees
function flatten(treeList, childrenKey, collection, compareFunc) {
  if (!treeList || treeList.length === 0) return
  treeList.sort(compareFunc)
  for (let node of treeList) {
    collection.push(node)
    flatten(node[childrenKey], childrenKey, collection)
  }
}

export default CommentListContainer
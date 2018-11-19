import React from 'react'
import API from '../../utils/API'
import CommentList from './CommentList';
import makeTreeList from '../../utils/makeTreeList'
import VoteBasketContainer from '../VoteBasket/VoteBasketContainer';

// do the thing and grab all the comments for the associated post.
// we get the the post id passed in as a prop, then make hte network requests.

// TODO: Limit comment rendering to a maximum depth
// TODO: Limit maximum number of comments fetched somehow..
// TODO: Determine whether it's better to build the comment tree client or server-side

class CommentListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      treeList: [],
      pendingVotes: [],
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

  addPendingVote = (commentId, authorName, cost) => {
    const newVote = { commentId, authorName, cost }
    const pendingVotes = [...this.state.pendingVotes, newVote]
    this.setState({ pendingVotes })
  }

  removePendingVote = commentId => {
    const pendingVotes = this.state.pendingVotes.filter(v => v.commentId !== commentId)
    this.setState({ pendingVotes })
  }

  submitVotes = () => {
    // TODO: make the API call to submit the votes, then grab the comment list again
  }

  // a better way to handle this might be to not actually fetch and sort right away
  // instead, we could just add the comment directly to the list and submit the comment in the background
  submitComment = data => {
    API.createComment(this.props.postId, data)
      .then(result => console.log('submitComment result: ', result))
      .then(() => this.fetchComments())
      .then(() => this.sortComments())
      .catch(err => console.log('submitComment Err: ', err))
  }

  render() {
    return (
      <React.Fragment>
        <VoteBasketContainer
          pendingVotes={this.state.pendingVotes}
          addPendingVote={this.addPendingVote}
          removePendingVote={this.removePendingVote}
          submitVotes={this.submitVotes}
        />
        <CommentList
          comments={this.state.treeList}
          pendingVotes={this.state.pendingVotes}
          submitComment={this.submitComment}
          removePendingVote={this.removePendingVote}
          addPendingVote={this.addPendingVote}
          root
        />
      </React.Fragment>
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

// but the difficulty here is that it is much less straightforward to do 
// operations like collapsing all the children if it's not a nested dom.
// collapseComment = (commentId, depth) => {
//   const comments = this.state.displayedComments.filter(comment => {
//     if (comment.ancestors.length <= depth) return true
//     if (!comment.ancestors.includes(commentId)) return true
//   })

//   this.setState({ displayedComments: comments })
// }

export default CommentListContainer
import React from 'react'
import API from '../../utils/API';
import ContentDetail from './ContentDetail';

class ContentDetailContainer extends React.Component {

  componentDidMount() {
    this.fetchPostData()
  }

  fetchPostData() {
    return API.getPost(this.props.postId)
      .then(result => {
        let post = result.data
        this.setState({ ...post })
      })
      .catch(err => console.log('fetchPostData Err: ', err))
  }

  afterUpvotePayment = (trans) => {
    console.log('Last transaction', trans)
    API.upvotePost(this.state._id).then(result => {
      console.log('After upvote: ', result)
      let voteNames = []
      result.data.voters.map(voterRec => voteNames.push(voterRec))
      this.setState({
        upvotes: result.data.voters.length,
        upvoteList: voteNames
      })
    })
  };

  afterPurchasePayment = (trans) => {
    console.log('purchase trans: ', trans)
    API.purchasePost(this.state._id).then(result => {
      console.log('After purchase success: ', result)
      this.setState({
        purchasers: result.data.purchasers.map(p => p._id)
      });
    });
  };

  render() {
    return (
      <ContentDetail
        afterUpvotePayment={this.afterUpvotePayment}
        afterPurchasePayment={this.afterPurchasePayment}
        {...this.state}
      />
    )
  }
}

export default ContentDetailContainer
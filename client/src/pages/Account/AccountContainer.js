import React from "react";
import API from '../../utils/API';
import AccountPage from '../Account/AccountPage'
import withAuthorization from '../../components/AuthUserSession/withAuthorization';

class AccountContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosts: [],
      currentView: 'POSTS',
      drafts: []
    }
  }

  componentDidMount(){
    console.log(this.props)
    let promises = [this.getPostsAndDrafts(this.props.authUser.dbUser._id)]
    Promise.all(promises)
      .then(results => {
        const drafts = results[0].filter(post => post.isDraft)
        const userPosts = results[0].filter(post => !post.isDraft)
        console.log(results)
        this.setState({
          drafts: drafts,
          userPosts: userPosts
        });
      })
  };

  getPostsAndDrafts = (id) => {
    return API.getPostsAndDrafts(id).then(results => results.data)
  };

  switchView = (event, viewType) => {
    event.preventDefault();
    this.setState({ currentView: viewType })
  }
  
  removeDraft = (event, index, id) => {
    console.log(id)
    event.preventDefault();
    let array = this.state.drafts
    array.splice(index, 1)
    this.setState({ drafts: array })
    API.deletePost(id)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  };

  render(){
    return(
        <AccountPage 
          {...this.state} 
          userId={this.props.authUser.dbUser._id}
          switchView={this.switchView}
          removeDraft={this.removeDraft}
        />
    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(AccountContainer);
import React, { Component } from "react";
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import {PostList, PostListItem} from '../../components/PostComponents/PostListDisplay';
import { Input, TextArea, FormBtn } from "../../components/PostComponents/PostForm";
import API from '../../utils/API';
import './account.css';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userPosts: [],
        userName: props.authUser.dbUser.username, 
        id: props.authUser.dbUser._id,
        formIsHidden: true
    };
  };

  componentDidMount() {
    let promises = [this.getPosts(this.state.id)]
    Promise.all(promises)
      .then(results => {
          // console.log(results[0].posts[0])
        this.setState({
          userPosts: results[0]
        });
      });
  };

  getPosts = (id) => {
    return API.getUserPosts(id).then(results => results.data);
  };

  getPostsAndBio = (id) => {
    return API.getPostsAndBio(id).then (results => results.data)
  }

  handleDeleteButton = (event, id) => {
    event.preventDefault();
    API.deletePost(id)
    .then(res => {
      this.updateAfterDelete(id)
    })
    .catch(err => console.log(err));
  }

  updateAfterDelete = (id) => {
    return API.getUserPosts(id).then(res => this.setState({userPosts: res.data}))
  }

  toggleForm () {
    this.setState({
        formIsHidden: !this.state.formIsHidden
    })
  };

  render() {
      return (
        <div className='pagebody'>
            <div className='row'>
            <div className='col-lg-2'></div>
            <div className='col-lg-8'>
              <div className="categoryDetail">
              <div>Hello {this.state.userName}!</div><hr/>
              <button className="btn btn-success" onClick={this.toggleForm.bind(this)}>Update Bio</button>
              {!this.state.formIsHidden && <BioComponent />}
                <PostList>
                {this.state.userPosts.map(userPosts => (
                    <PostListItem
                    key={userPosts._id}
                    authorName={userPosts.authorName}
                    body={userPosts.body}
                    categoryName={userPosts.categoryName}
                    comments={userPosts.comments}
                    purchasers={userPosts.purchasers}
                    tags={userPosts.tags}
                    teaser={userPosts.teaser}
                    title={userPosts.title}
                    _id={userPosts._id}
                    author={userPosts.author}//This is the numbers one. May not need
                    handleDeleteButton={this.handleDeleteButton}
                    />
                ))}
                </PostList>
              </div>
            </div>
            <div className='col-lg-2'></div>
            </div>
        </div>
      );
  };
};

 const BioComponent = (props) => {
  return (
      <div>
          hello
      </div>
  )
}
const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(Account);
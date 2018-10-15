import React, { Component } from "react";
import {PostList, PostListItem} from '../../components/PostComponents/PostListDisplay';
import { Input, TextArea, FormBtn } from "../../components/PostComponents/PostForm";
import API from '../../utils/API';
import './profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userPosts: [],
        authorName: "",
        displayedBio: "",
    };
  };

  componentDidMount() {
    console.log(this.props)
    let promises = [this.getPostsAndBio(this.props.match.params.id)]
    Promise.all(promises)
      .then(results => {
          console.log(results)
        this.setState({
          userPosts: results[0].posts,
          displayedBio: results[0].user.bio,
          authorName: results[0].user.username,
        });
      })
  };

  getPostsAndBio = (id) => {
    return API.getPostsAndBio(id).then(results => results.data);
  };

  getProfile

  render() {
      return (
        <div className='pagebody'>
            <div className='row'>
            <div className='col-lg-2'></div>
            <div className='col-lg-8'>
              <div className="categoryDetail">
              <div><h3>Profile of: {this.state.authorName}</h3></div>
              <div>Bio of {this.state.authorName}: {this.state.displayedBio} </div>
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
                    author={userPosts.author}
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

export default Profile;
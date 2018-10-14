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
        authorName: ""
    };
  };

  componentDidMount() {
    console.log(this.props)
    let promises = [this.getPosts(this.props.match.params.id)]
    Promise.all(promises)
      .then(results => {
          console.log(results)
        this.setState({
          userPosts: results[0],
          authorName: results[0][0].authorName
        });
      })
  };

  getPosts = (id) => {
    return API.getUserPosts(id).then(results => results.data);
  };

  render() {
      return (
        <div className='pagebody'>
            <div className='row'>
            <div className='col-lg-2'></div>
            <div className='col-lg-8'>
              <div className="categoryDetail">
              <div><h3>{this.state.authorName}</h3></div>
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

export default Profile;
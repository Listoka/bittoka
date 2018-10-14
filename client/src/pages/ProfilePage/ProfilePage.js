import React, { Component } from "react";
import {PostList, PostListItem} from '../../components/PostComponents/PostListDisplay';
import { Input, TextArea, FormBtn } from "../../components/PostComponents/PostForm";
import API from '../../utils/API';
import './profilePage.css';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userPosts: []
    };
  };

  componentDidMount() {
    let promises = [this.getPosts(this.state.id)]
    Promise.all(promises)
      .then(results => {
          console.log(results)
        this.setState({
          userPosts: results[0]
        });
      });
  };

  render() {
      return (
        <div className='pagebody'>
            <div className='row'>
            <div className='col-lg-2'></div>
            <div className='col-lg-8'>
              <div className="categoryDetail">
                
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

export default ProfilePage;
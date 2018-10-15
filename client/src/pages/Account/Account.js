import React, { Component } from "react";
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import { PostList, PostListItem } from '../../components/PostComponents/PostListDisplay';
import { TextArea, FormBtn } from "../../components/PostComponents/PostForm";
import API from '../../utils/API';
import './account.css';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userPosts: [],
        userName: props.authUser.dbUser.username, 
        id: props.authUser.dbUser._id,
        // formIsHidden: true
        bio: "",
        displayedBio: "",
        profileUsername: "",
    };
  };

  componentDidMount() {
    let promises = [this.getPostsAndBio(this.state.id)]
    Promise.all(promises)
      .then(results => {
        console.log(results)
        this.setState({
          userPosts: results[0].posts,
          displayedBio: results[0].user.bio,
        });
      });
  };

  // getPosts = (id) => {
  //   return API.getUserPosts(id).then(results => results.data);
  // };

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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();
    const data = {
        bio: this.state.bio
    };
    if (this.state.bio.length > 4) {
        
        API.updateProfile(this.state.id, data)
        .then(res => this.setState({ bio: "" }), API.getPostsAndBio(this.state.id))
        .catch(err => console.log(err))
    };
};

  render() {
      return (
        <div className='pagebody'>
            <div className='row'>
            <div className='col-lg-2'></div>
            <div className='col-lg-8'>
              <div className="categoryDetail">
              Eventually this will be filled with a Bio that turns into a form upon edit<hr />
              {this.state.displayedBio}
              <form>
                <TextArea
                  value={this.state.bio}
                  onChange={this.handleInputChange}
                  name="bio"
                  placeholder="Enter bio here"
                />
                <FormBtn
                  disabled={!(this.state.bio)}
                  onClick={this.handleFormSubmit}
                >
                  Submit Bio
                </FormBtn>
              </form>
              {/* <div>Hello {this.state.userName}!</div><hr/> */}
              {/* <button className="btn btn-success" onClick={this.toggleForm.bind(this)}>Update Bio</button>
              {!this.state.formIsHidden && <BioComponent />} */}
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

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(Account);
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
        showBio: true,
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
          bio: results[0].user.bio,
        });
      });
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
        .then(res => console.log(res.data), this.setState({ showBio: true }), API.getPostsAndBio(this.state.id))
        .catch(err => console.log(err))
    };
};

editBio = () => {this.setState(prevState => ({showBio: !prevState.showBio}))}

  render() {
      return (
        <div className='pagebody'>
            <div className='row'>
            <div className='col-lg-2'></div>
            <div className='col-lg-8'>
              <div className="categoryDetail">
              <hr />
              {this.state.showBio 
              ? <div>
                  {this.state.userName}'s bio: <i className="far fa-edit btn" onClick={this.editBio}> Edit Bio</i><br />
                  {this.state.bio} 
                </div> 
              : <form>
                <i className="fas fa-undo btn" onClick={this.editBio}>Cancel</i>
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
              
            }

              
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

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(Account);
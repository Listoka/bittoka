import React, { Component } from "react";
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import { PostList, PostListItem, DraftListItem } from '../../components/PostComponents/PostListDisplay';
import { TextArea, FormBtn, Input } from "../../components/PostComponents/PostForm";
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
      drafts: [],
      showMoneyBtnId: true,
    };
  };

  componentDidMount() {
    let promises = [this.getPostsAndBio(this.state.id), this.getPostsAndDrafts(this.state.id)]
    Promise.all(promises)
      .then(results => {
        const drafts = results[1].filter(post => post.isDraft)
        console.log(results)
        this.setState({
          userPosts: results[0].posts,
          bio: results[0].user.bio,
          drafts: drafts,
          moneyBtnId: results[0].user.moneyBtnId
        });
      })
  };

  getPostsAndDrafts = (id) => {
    return API.getPostsAndDrafts(id).then(results => results.data)
  }

  getPostsAndBio = (id) => {
    return API.getPostsAndBio(id).then(results => results.data)
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
    return API.getUserPosts(id).then(res => this.setState({ userPosts: res.data }))
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

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

  handleFormSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();
    const data = {
      bio: this.state.bio,
      moneyBtnId: this.state.moneyBtnId
    };
    if (this.state.bio.length > 4) {

      API.updateProfile(this.state.id, data)
        .then(res => console.log(res.data), this.setState({ showBio: true }), API.getPostsAndBio(this.state.id))
        .catch(err => console.log(err))
    };
  };

  editBio = () => { this.setState(prevState => ({ showBio: !prevState.showBio })) }
  editmoneyBtnId = () => { this.setState(prevState => ({ showMoneyBtnId: !prevState.showMoneyBtnId })) }

  handleMoneyBtnIdSubmit = (event) => {
    event.preventDefault();
    const data = {
      moneyBtnId: this.state.moneyBtnId,
      bio: this.state.bio
    };
    API.updateProfile(this.state.id, data)
      .then(res => console.log(res.data), this.setState({ showMoneyBtnId: true }))
      .catch(err => console.log(err))
  };

  render() {
    return (
      <div className='pagebody'>
        <div className='row'>
          <div className='col-lg-2'></div>
          <div className='col-lg-7'>
            <div className="categoryDetail rounded">
              <div className='bioContainer'>
                <div className='row'>
                  <div className='col-md-6'>
                    <h2 className='bioHeader'>{this.state.userName}'s Bio 
                    {this.state.showBio
                    ? <i className="far fa-edit btn" onClick={this.editBio}></i>
                    : null
                    }
                    </h2>
                  </div>
                  <div className='col-md-6'>
                    <div className='moneyBtnIdContainer'>
                      {this.state.showMoneyBtnId
                        ? <p id='mbEdit'>Your MoneyButton User Number: {this.state.moneyBtnId}
                           <i className="far fa-edit btn"
                            onClick={this.editmoneyBtnId}></i>
                        </p>
                        : <form>
                          <i className="fas fa-undo btn" onClick={this.editmoneyBtnId}>Cancel</i>
                          <Input
                            value={this.state.moneyBtnId}
                            onChange={this.handleInputChange}
                            name="moneyBtnId"
                            style={{ width: 125 + 'px' }}
                          />
                          <FormBtn
                            disabled={!(this.state.moneyBtnId)}
                            onClick={this.handleMoneyBtnIdSubmit}
                          >
                            Update
                    </FormBtn>
                        </form>
                      }
                    </div>
                  </div>
                </div>
                <hr></hr>
                {this.state.showBio
                  ? <div className='bioTextWrapper'>
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
                      Update Bio
                  </FormBtn>
                  </form>
                }
              </div>
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
                    voters={userPosts.voters}
                  />
                ))}
              </PostList>
              <hr></hr>
            </div>
          </div>
          <div className='col-lg-3'>
            <div className='draftDetail rounded'>
              <PostList>
                <h5>Pending Drafts</h5>
                <hr></hr>
                {this.state.drafts.map((drafts, index) => (
                  <DraftListItem
                    key={drafts._id}
                    index={index}
                    categoryName={drafts.categoryName}
                    title={drafts.title}
                    postId={drafts._id}
                    author={drafts.author}
                    updatedAt={drafts.updatedAt}
                    removeDraft={this.removeDraft}
                  />
                ))}
              </PostList>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(Account);
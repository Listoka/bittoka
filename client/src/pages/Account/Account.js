import React, { Component } from "react";
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import { PostList, PostListItem, DraftListItem } from '../../components/PostComponents/PostListDisplay';
import { EditButton, PageBody, Row, CancelIcon, Button, TextArea, Input, Container, DraftContainer, BioContainer } from '../../components/Widgets';
import API from '../../utils/API';

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
      amtPaid: 0,
      amtEarned: 0
    };
  };

  componentDidMount() {
    let promises = [this.getPostsAndBio(this.state.id), this.getPostsAndDrafts(this.state.id), this.getTotalPaidToUser(this.state.id), this.getTotalPaidFromUser(this.state.id)]
    Promise.all(promises)
      .then(results => {
        const drafts = results[1].filter(post => post.isDraft)
        console.log(results)
        this.setState({
          userPosts: results[0].posts,
          bio: results[0].user.bio,
          drafts: drafts,
          moneyBtnId: results[0].user.moneyBtnId,
          amtEarned: results[2].totalPaid.toFixed(2),
          amtPaid: results[3].totalPaid.toFixed(2)
        });
      })
  };

  getPostsAndDrafts = (id) => {
    return API.getPostsAndDrafts(id).then(results => results.data)
  }

  getPostsAndBio = (id) => {
    return API.getPostsAndBio(id).then(results => results.data)
  }

  getTotalPaidToUser = (id) => {
    return API.getTotalPaidToUser(id).then(results => results.data[0])
  }

  getTotalPaidFromUser = (id) => {
    return API.getTotalPaidFromUser(id).then(results => results.data[0])
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
      <PageBody>
        <Row>
          <div className='col-lg-2'></div>
          <div className='col-lg-7'>
          {/* This could be added to another type of its own container */}
            <div className="mt-10px py-2 rounded min-h-full bg-white">
              <BioContainer>
                <Row>
                  <div className='col-md-6'>
                    <h2 className='font-header'>{this.state.userName}'s Bio 
                    {this.state.showBio
                    ? <EditButton onClick={this.editBio} />
                    : null
                    }
                    </h2>
                  </div>
                  <div className='col-md-6'></div>
                </Row>
                
                {this.state.showBio
                  ? <div>
                      {this.state.bio}
                      <hr/>
                    </div>
                  : <form>
                    <TextArea
                      value={this.state.bio}
                      onChange={this.handleInputChange}
                      name="bio"
                      placeholder="Enter bio here"
                    />
                    <Button
                      disabled={!(this.state.bio)}
                      onClick={this.handleFormSubmit}
                      text='Update Bio'
                    />
                  <CancelIcon onClick={this.editBio} text='Cancel'/>
                  </form>
                }
              </BioContainer>

              <Container>
                  {this.state.showMoneyBtnId
                    ? <div>Your MoneyButton User Number: {this.state.moneyBtnId} 
                      <EditButton 
                        text='Edit'
                        onClick={this.editmoneyBtnId}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    : <form>
                      <Input
                        value={this.state.moneyBtnId}
                        onChange={this.handleInputChange}
                        name="moneyBtnId"
                        style={{ width: 125 + 'px' }}
                      />
                      <Button
                        disabled={!(this.state.moneyBtnId)}
                        onClick={this.handleMoneyBtnIdSubmit}
                        text='Update'
                      >
                      </Button>
                      <CancelIcon onClick={this.editmoneyBtnId} text='Cancel'/>
                    </form>
                  }
                <div>
                  <p>Total paid to other users to date: ${this.state.amtPaid}<br></br>Total earned from other users to date: ${this.state.amtEarned}</p>
                </div>
              </Container>

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
            <DraftContainer>
              <PostList>
                <h5 className='font-header'>Pending Drafts</h5>
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
            </DraftContainer>
          </div>
        </Row>
      </PageBody>
    );
  };
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(Account);
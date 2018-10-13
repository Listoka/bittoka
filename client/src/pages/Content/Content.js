import React, { Component } from "react";
import API from '../../utils/API';
import {PostDetail} from '../../components/PostComponents/PostDetail/PostDetail';
import {Comments, CommentList} from '../../components/CommentDisplay';
import withAuthorization from '../../components/AuthUserSession/withAuthorization'
import TipButton from '../../components/TipButton';
import { TextArea, FormBtn } from "../../components/PostComponents/PostForm";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
        post: {},
        comments: [],
        postID: props.match.params.id,
        body: "",
    };
  };

  componentDidMount() {
    this.getPostWithComments();
  };

  getPostWithComments = () => {
    API.getPostWithComments(this.props.match.params.id)
    .then(res => this.setState({ post: res.data, comments: res.data.comments, body: "" }))
    // .then (res=> console.log(res.data))
    .catch(err => console.log(err));
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
        body: this.state.body,
        commentPath: "commentPath"
    }
    if (this.state.body.length > 4) {
        API.createComment(this.state.postID, data)
        // .then( res => this.setState({ redirectToNewPage: true }))
        .then (res => this.getPostWithComments())
        .catch(err => console.log(err))
    }
  }

  afterPayment = () => {
    alert('Payment successful!')
  }

    render() {
      return (
        <React.Fragment>
          <div className="container-fluid">
            <div className="row">
             <div className="col-xl-2"></div>
              <div className="col-xl-8">
                <PostDetail 
                  key={this.state.post._id}
                  authorName={this.state.post.authorName}
                  body={this.state.post.body}
                  categoryName={this.state.post.categoryName}
                  comments={this.state.post.comments}
                  purchasers={this.state.post.purchasers}
                  tags={this.state.post.tags}
                  teaser={this.state.post.teaser}
                  title={this.state.post.title}
                  _id={this.state.post._id}
                  author={this.state.post.author}
                />
                <hr/>
                <TextArea 
                    value={this.state.body}
                    onChange={this.handleInputChange}
                    name="body"
                    placeholder="Share your comment here"
                />
                <FormBtn
                  disabled={!(this.state.body.length >4)}
                  onClick={this.handleFormSubmit}
                >
                  Submit Comment
                </FormBtn>
                <hr/>
                <CommentList>
                  {this.state.comments.map(comments => (
                      <Comments 
                      key={comments._id}
                      author={comments.author}
                      authorName={comments.authorName}
                      body={comments.body} 
                      // voters={comments.voters} 
                      comments={comments.comments}
                      createdAt={comments.createdAt} 
                      id={comments._id}
                      />
                  ))}
                </CommentList>
              </div>
             <div className="col-xl-2"></div>
            </div>
          </div>
        </React.Fragment>
      );
    };
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(Content);
import React, { Component } from "react";
import { TextArea, FormBtn } from "../PostComponents/PostForm";
import API from '../../utils/API';
import { NestedComments } from '../CommentDisplay/NestedComments';
import Moment from 'react-moment';
import './Comments.css';
import { Link } from 'react-router-dom';

export class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentBoxIsHidden: true,
      commentsAreHidden: true
    }
  };
  componentDidMount() {
    // console.log(this.props)
    // console.log(this.props._id)
  }

  toggleCommentBox(event) {
    event.preventDefault()
    this.setState({
      commentBoxIsHidden: !this.state.commentBoxIsHidden
    })
  };
  toggleComments(event) {
    event.preventDefault()
    this.setState({
      commentsAreHidden: !this.state.commentsAreHidden
    })
  };

  render() {
    const createdDate = this.props.createdAt && this.props.createdAt.slice(0, 10)
    return (
      <React.Fragment>
        <hr />
        <div className='comment'>
          <p className='smallPostCommentText'><Link to={{ pathname: `/user/${this.props.author}` }}>{this.props.authorName}</Link>&nbsp;&nbsp;<i className="fas fa-calendar-alt"></i>&nbsp;&nbsp;<Moment fromNow>{this.props.createdAt}</Moment>&nbsp;&nbsp;<i className="fab fa-bitcoin"></i>&nbsp;&nbsp;[earned $x.xx]</p>
          <br></br>
          <p className='mediumPostText'> {this.props.body}</p>
          <p>[#Upvotes][Upvote MoneyButton Component]</p>
          <p>
            <a onClick={this.toggleCommentBox.bind(this)} href={`/comments/${this.props._id}`}>[Reply]</a>
            <a onClick={this.toggleComments.bind(this)} href={`/comments/${this.props._id}`}>[View Replies]</a>
          </p>
          {/* <button className="btn btn-secondary btn-sm" onClick={this.toggleCommentBox.bind(this)}>[Reply]</button>&nbsp;&nbsp; */}
          {/* <button type="button" className="btn btn-secondary btn-sm" onClick={this.toggleComments.bind(this)}>[View Replies <i className="far fa-comment">]</i></button> */}
          {!this.state.commentBoxIsHidden && <CommentBox id={this.props._id} toggleCommentBox={this.toggleCommentBox} />}
          {!this.state.commentsAreHidden && <LayeredComments commentID={this.props._id} />}
        </div>
      </React.Fragment>
    );
  };
};

class LayeredComments extends Component {

  constructor(props) {
    super(props)
    this.state = {
      layeredComments: [],
    };
  };

  componentDidMount() {
    console.log(this.props)
    this.getLayeredComments()
  };

  getLayeredComments = () => {
    console.log(this.props)
    API.getLayeredComments(this.props.commentID)
      .then(res => this.setState({ layeredComments: res.data.comments }))
  }

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.layeredComments.map(comments => (
            <NestedComments
              key={comments._id}
              author={comments.author}
              authorName={comments.authorName}
              body={comments.body}
              createdAt={comments.createdAt}
            />
          ))}
        </div>
      </React.Fragment>
    );
  };
};

class CommentBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      layeredBody: "",
    };
  };

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
      body: this.state.layeredBody
    };
    if (this.state.layeredBody.length > 4) {
      console.log(this.props.id)
      API.createLayeredComment(this.props.id, data)
        .then(res => this.setState({ layeredBody: "" }))
        // .then( res => this.state.props.toggleCommentBox())
        // .then (res => this.getPostWithComments())
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    };
  };

  render() {
    return (
      <React.Fragment>

        <TextArea
          value={this.state.layeredBody}
          onChange={this.handleInputChange}
          name="layeredBody"
          placeholder="Share your comment here"
        />
        <FormBtn
          disabled={!(this.state.layeredBody.length > 4)}
          onClick={this.handleFormSubmit}
        >
          Submit Comment
            </FormBtn>
      </React.Fragment>
    );
  };
};
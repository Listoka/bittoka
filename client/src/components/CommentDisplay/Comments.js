import React, { Component } from "react";
import API from '../../utils/API';
import { NestedComments } from '../CommentDisplay/NestedComments';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import AuthUserContext from "../AuthUserSession/AuthUserContext";
import { Button, TextArea, CommentContainer, Paragraph, CalendarIcon, BitcoinIcon } from '../Widgets';

export class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentBoxIsHidden: true,
      commentsAreHidden: true
    }
  };
  componentDidMount() {
     console.log(this.props)
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
    return (
      <React.Fragment>
        <hr/>
        <CommentContainer styles={''}>
          <Paragraph styles={'text-sm'}><Link to={{ pathname: `/users/${this.props.author}` }}>{this.props.authorName}</Link>
            <span className='mr-2'></span><CalendarIcon />
            <span className='mr-1'></span><Moment fromNow>{this.props.createdAt}</Moment>
            <span className='mr-2'></span><BitcoinIcon />
            <span className='mr-1'></span>[earned $x.xx]
          </Paragraph>
          <br></br>
          <Paragraph styles={'text-base'}> {this.props.body}</Paragraph>
          <Paragraph styles={'text-sm'}>[#Upvotes][Upvote MoneyButton Component]</Paragraph>
          <Paragraph styles={'text-sm'}>
            <AuthUserContext.Consumer>
              {authUser =>
                authUser
                  ? <a onClick={this.toggleCommentBox.bind(this)} href={`/comments/${this.props._id}`}>[Reply]</a>
                  : null
              }
            </AuthUserContext.Consumer>
            <a onClick={this.toggleComments.bind(this)} href={`/comments/${this.props._id}`}>[View Replies {this.props.comments.length}]</a>
          </Paragraph>
          {/* <button className="btn btn-secondary btn-sm" onClick={this.toggleCommentBox.bind(this)}>[Reply]</button><span className='mr-2'></span> */}
          {/* <button type="button" className="btn btn-secondary btn-sm" onClick={this.toggleComments.bind(this)}>[View Replies <i className="far fa-comment">]</i></button> */}
          {!this.state.commentBoxIsHidden && <CommentBox id={this.props._id} toggleCommentBox={this.toggleCommentBox} />}
          {!this.state.commentsAreHidden && <LayeredComments commentID={this.props._id} />}
        </CommentContainer>
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
          {this.state.layeredComments.map(comments => (
            <NestedComments
              key={comments._id}
              author={comments.author}
              authorName={comments.authorName}
              body={comments.body}
              createdAt={comments.createdAt}
            />
          ))}
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
        <Button
          disabled={!(this.state.layeredBody.length > 4)}
          onClick={this.handleFormSubmit}
          text='Submit'
        />
      </React.Fragment>
    );
  };
};
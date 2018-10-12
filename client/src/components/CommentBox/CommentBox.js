import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { TextArea, FormBtn } from "../../components/PostComponents/PostForm";
import API from '../../utils/API';
import withAuthorization from '../../components/AuthUserSession/withAuthorization';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        authorName: props.authUser.dbUser.username,
        body: "",
        author: props.authUser.dbUser._id,
        commentPath: "something",
        postID: props.match.params.id,
        redirectToNewPage: false,
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
      body: this.state.body,
      commentPath: "commentPath"
    }
    if (this.state.body.length > 4) {
      console.log(this.state.postID)
      API.createComment(this.state.postID, data)
      .then( res => this.setState({ redirectToNewPage: true }))
      .then (res => console.log(res.data._id))
      .catch(err => console.log(err))
    }
  }

    render() {

        if (this.state.redirectToNewPage) {
          return (
            <Redirect to={{ pathname: `/api/posts/${this.state.postID}`}} />
          )
        };
        return(
          <React.Fragment>
            <TextArea 
              value={this.state.body}
              onChange={this.handleInputChange}
              name="body"
              placeholder="Share your reply here"
            />
            <FormBtn
              disabled={!(this.state.body.length >4)}
              onClick={this.handleFormSubmit}
            >
            Submit Comment
            </FormBtn>
          </React.Fragment>
        );
    };
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(CommentBox);
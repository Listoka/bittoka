import React, { Component } from 'react';
import { TextArea, FormBtn } from "../../components/PostForm";
import API from '../../utils/API';
import withAuthorization from '../../components/AuthUserSession/withAuthorization';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        authorName: props.authUser.dbUser.username,
        body: "",
        author: props.authUser.dbUser._id,
        commentPath: "something"
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
    if (this.state.body.length > 4) {
      API.createComment({
        body: this.state.body,
        author: this.state.author,
        authorName: this.state.authorName, //May not need this one
        commentPath: this.state.commentPath
      })
      .then(res=> this.setState({body: ""}))
      .catch(err => console.log(err))
    }
  }

    render() {
        return(
            <div>
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
            </div>
        );
    };
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(CommentBox);
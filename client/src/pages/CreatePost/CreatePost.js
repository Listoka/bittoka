import React, { Component } from "react";
import withAuthorization from '../../components/AuthUserSession/withAuthorization'
import './createPost.css';
import { Input, TextArea, FormBtn } from "../../components/StoriesForm";
import API from '../../utils/API';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorName: props.authUser.dbUser.username,
      body: "",
      // categoryName: "",
      // comments: "",
      // purchasers: "",
      tags: "",
      teaser: "",
      title: "",
      author: props.authUser.dbUser._id
    };
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  //We will likely need to pass in user information (such as author) into this function
  handleFormSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    if (this.state.title && this.state.teaser && this.state.body) {
      API.createBitcoinStoryPost({
        title: this.state.title,
        teaser: this.state.teaser,
        body: this.state.body,
        author: this.state.author,
        authorName: this.state.authorName
      })
      .then(res => console.log("Create Story response/result: " + res))
      .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <div>
        <div className="col-md-4">
          <form>
            <Input
              value={this.state.title}
              onChange={this.handleInputChange}
              name="title"
              placeholder="Title of your Story"
            />
            <Input
              value={this.state.teaser}
              onChange={this.handleInputChange}
              name="teaser"
              placeholder="Enter your teaser here"
            />
            <TextArea
              value={this.state.body}
              onChange={this.handleInputChange}
              name="body"
              placeholder="Enter Story Here"
            />
            <FormBtn
              disabled={!(this.state.title && this.state.teaser && this.state.body)}
              onClick={this.handleFormSubmit}
            >
              Submit Story
          </FormBtn>
          </form>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-6"></div>
      </div>
    );
  };
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(CreatePost);
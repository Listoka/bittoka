import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import './createPost.css';
import { Input, TextArea, FormBtn } from "../../components/PostComponents/PostForm";
import API from '../../utils/API';

export class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: props.authUser.dbUser._id,
      authorName: props.authUser.dbUser.username,
      body: "",
      categoryName: props.location.state.categoryName, //This comes from the CreatePostButton component
      // comments: "",
      // purchasers: "",
      tags: "",
      teaser: "",
      title: "",
      redirectToNewPage: false,
      redirectPathId: "",
    };
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

    const { title, teaser, body, tags } = this.state
    if (title && teaser && body) {
      const data = {
        title: title,
        teaser: teaser,
        body: body,
        tags: tags,
        author: this.state.author,
        authorName: this.state.authorName,
        categoryName: this.state.categoryName
      }

      API.createPost(data)
        .then(result => {
          console.log('authAxios result: ', result)
          this.setState({ redirectToNewPage: true, redirectPathId: result.data._id })
        }).catch(err => console.log(err))

    }
  }

  render() {

    if (this.state.redirectToNewPage) {
      return (
        <Redirect to={{ pathname: '/api/posts/' + this.state.redirectPathId }} />
      )
    };

    return (
      <div>
        <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
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
        </div>
      </div>
    );
  };
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(CreatePost);
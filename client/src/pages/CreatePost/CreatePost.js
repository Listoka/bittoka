import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import './createPost.css';
import { Input, TextArea, FormBtn } from "../../components/PostComponents/PostForm";
import API from '../../utils/API';
import RichTextEditor from 'react-rte'

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
      value: RichTextEditor.createEmptyValue()
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onChange = (value) => {
    this.setState({value})
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }
  }

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
      <React.Fragment>
        <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <RichTextEditor
            value={this.state.value}
            onChange={this.onChange}
          />
        </div>
        <div className="col-md-2"></div>
        </div>
      </React.Fragment>
    );
  };
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(CreatePost);
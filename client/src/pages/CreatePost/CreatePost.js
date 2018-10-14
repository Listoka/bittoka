import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import './createPost.css';
/*import { Input, TextArea, FormBtn } from "../../components/PostComponents/PostForm";*/
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


  onEditorChange = (value) => this.setState({ value })
    
  handleInputChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleFormSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();

    const { title, tags, value } = this.state
    const body = value.toString('html')
    if (title && body) {
      const data = {
        title: title,
        // teaser: teaser,
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
            <form style={{ margin: '30px 0' }} onSubmit={this.handleFormSubmit}>
              <div className='form-group'>
                {/* <label htmlFor='title-input'>Title</label> */}
                <input className='form-control' type='text' onChange={this.handleInputChange} placeholder='Title' name='title' />
              </div>
              <RichTextEditor
                value={this.state.value}
                onChange={this.onEditorChange}
              />
              <input className='btn btn-primary' style={{ margin: '20px 0'}} type='submit' />
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>
      </React.Fragment>
    );
  };
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(CreatePost);
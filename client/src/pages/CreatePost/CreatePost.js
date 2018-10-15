import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import './createPost.css';
/*import { Input, TextArea, FormBtn } from "../../components/PostComponents/PostForm";*/
import API from '../../utils/API';
import RichTextEditor from 'react-rte';

export class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      teaser: "",
      title: "",
      categoryName: "Select a category",
      categoryTags: [],
      redirectToNewPage: false,
      redirectPathId: "",
      value: RichTextEditor.createEmptyValue()
    };

    //this.categoryName = props.match.params.categoryName
  }

  componentDidMount() {
    this.setState({ categoryName: this.props.match.params.categoryName });
    console.log(this.state);
  }

  onEditorChange = (value) => this.setState({ value })

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log("I did a thing");
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
        categoryName: this.categoryName
      }

      API.createPost(data)
        .then(result => {
          console.log('createPost result: ', result)
          this.setState({ redirectToNewPage: true, redirectPathId: result.data._id })
        }).catch(err => console.log(err))

    }
  }

  render() {

    if (this.state.redirectToNewPage) {
      return (
        <Redirect to={{ pathname: '/posts/' + this.state.redirectPathId }} />
      )
    };

    return (
      <div className="pagebody">
        <React.Fragment>
          <div className="row createForm">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <h2>Create a post in: 
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" onChange={this.handleInputChange} name= "categoryName" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.categoryName}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" >listoka</a>
                    <a className="dropdown-item" >bitcoin-stories</a>
                    <a className="dropdown-item" >stories</a>
                  </div>
                </div>
                </h2>
                
              <form style={{ margin: '30px 0' }} onSubmit={this.handleFormSubmit}>
                <div className='form-group'>
                  {/* <label htmlFor='title-input'>Title</label> */}
                  <input className='form-control' type='text' onChange={this.handleInputChange} placeholder='Title' name='title' />
                </div>
                <RichTextEditor
                  value={this.state.value}
                  onChange={this.onEditorChange}
                />
                <input className='btn btn-primary' style={{ margin: '20px 0' }} type='submit' />
              </form>
            </div>
            <div className="col-md-2"></div>
          </div>
        </React.Fragment>
      </div>
    );
  };
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(CreatePost);
import React, { Component } from "react";
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import API from '../../utils/API';
import { Redirect } from 'react-router-dom';
import RichTextEditor from 'react-rte'

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // categoryName: props.location.state.categoryName,
      // teaser: props.location.state.teaser,
      redirectToNewPage: false,
      redirectPathId: "",
      postId: props.match.params.id,
      value: RichTextEditor.createEmptyValue(),
      error: null,
      title: ""
    };
    console.log(props)
  };

  componentDidMount() {
    API.getPost(this.state.postId)
      .then(dbPost => {
        console.log('load post', dbPost)
        this.setState({
          value: RichTextEditor.createValueFromString(dbPost.data.body, 'html'),
          title: dbPost.data.title,
        });
      });
  };

  onEditorChange = (value) => this.setState({ value })

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.postId)
    const { value } = this.state
    const data = {
      body: value.toString('html'),
      // teaser: this.state.teaser,
      title: this.state.title,
      isDraft: false
    }
    API.updatePost(this.state.postId, data)
      .then(result => {
        console.log('result', result)
        this.setState({ redirectToNewPage: true, redirectPathId: result.data._id })
      })
    .catch(err => console.log(err))
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log("I did a thing"); // A++ logging, right here
  }

  render() {
    if (this.state.redirectToNewPage) {
      return (
        <Redirect to={{ pathname: '/posts/' + this.state.redirectPathId }} />
      )
    };
    return (
      <React.Fragment>
        <div className="pagebody">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
            <h4>Title</h4>
            <input className='form-control' type='text' onChange={this.handleInputChange} value={this.state.title} name='title' />
            <br/>
            <h4>Content</h4>
              <form onSubmit={this.handleFormSubmit}>
                  <RichTextEditor value={this.state.value} onChange={this.onEditorChange} />
                <input type='submit' className='btn btn-primary' />
              </form>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </React.Fragment>
    );
  };
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(EditPage);
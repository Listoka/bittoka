import React, { Component } from "react";
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import API from '../../utils/API';
import { Redirect } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import './editpage.css';

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
      <div className= "pagebody">
      <React.Fragment>
        <div className="row editForm">
          <div className="col-md-2"></div>
          <div className="col-md-8 formBody rounded">
          <h2 className='editFormTitle'>{this.state.title}</h2>
          <hr></hr>
            <form onSubmit={this.handleFormSubmit}>
                <RichTextEditor value={this.state.value} onChange={this.onEditorChange} />
              <input type='submit' className='btn btn-primary editPageBtn' />
            </form>
          </div>
        </div>
      </React.Fragment>
      </div>
    );
  };
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(EditPage);
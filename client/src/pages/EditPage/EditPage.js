import React, { Component } from "react";
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import API from '../../utils/API';
import { Redirect } from 'react-router-dom';
import { Input, TextArea, FormBtn } from "../../components/PostComponents/PostForm";

class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: props.location.state.categoryName,
            body: props.location.state.body,
            _id: props.location.state._id,
            title: props.location.state.title,
            teaser: props.location.state.teaser,
            authorName: props.location.state.authorName,
            redirectToNewPage: false,
            redirectPathId: "",
        };
    };
    componentDidMount() {
        console.log(this.state);
    };

    //Need to add the function to update here and pass it through into the PostDetail component.
    //I'll need to redirect to the new page where the state is set with the current information, but then it is editable.
    //So The edit button links to a new page. Yours has it setup like that.
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { title, teaser, body } = this.state
        if (title && teaser && body) {
            const data = {
                title: title,
                teaser: teaser,
                body: body
            }
            API.updatePost(this.state._id, data)
              .then(result=> this.setState({ redirectToNewPage: true, redirectPathId: result.data._id }))
              .catch(err => console.log(err))
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
          Edit your post and click Submit once complete.
          <hr/>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
               />
              <Input
                value={this.state.teaser}
                onChange={this.handleInputChange}
                name="teaser"
              />
              <TextArea
                value={this.state.body}
                onChange={this.handleInputChange}
                name="body"
              />
              <FormBtn
                disabled={!(this.state.title && this.state.teaser && this.state.body)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>
        </div>
        );
    };
};
        
const authCondition = (authUser) => !!authUser;
        
export default withAuthorization(authCondition)(EditPage);
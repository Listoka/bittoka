import React, { Component } from "react";
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import API from '../../utils/API';

class EditPage extends Component {
  constructor(props) {
    super(props);
      this.state = {
        categoryName: props.location.state.categoryName,
        body: props.location.state.body,
        _id: props.location.state._id, 
        title: props.location.state.title, 
        teaser: props.location.state.teaser, 
        authorName: props.location.state.authorName
      };
    };
    componentDidMount() {
        console.log(this.state);
    };

    //Need to add the function to update here and pass it through into the PostDetail component.
    //I'll need to redirect to the new page where the state is set with the current information, but then it is editable.
    //So The edit button links to a new page. Yours has it setup like that.

    updatePost = () => {
        API.updatePost()
    };

    render() {
        return (
            <div>

            </div>
        );
    };
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(EditPage);
import React, { Component } from "react";
import './Stories.css';
import { Input, TextArea, FormBtn } from "../../components/StoriesForm";

class Stories extends Component {
  state = {
    stories: [],
    username: "",
    title: "",
    text: ""
  };
  //Logic

  // componentDidMount() {
  //   this.loadStories();
  // }
  
  // loadStories = () => {
  //   app.getStories()
  //     .then(res =>
  //       this.setState({ books: res.data, title: "", author: "", synopsis: "" })
  //     )
  //     .catch(err => console.log(err));
  // };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //Rendering
  render() {
    return(
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
            value={this.state.username}
            onChange={this.handleInputChange}
            name="username"
            placeholder="Username"
          />
          <TextArea
            value={this.state.text}
            onChange={this.handleInputChange}
            name="text"
            placeholder="Enter Story Here"
          />
          <FormBtn
            disabled={!(this.state.username && this.state.title && this.state.text)}
            // onClick={this.handleFormSubmit}
          >
            Submit Story
          </FormBtn>
        </form>
        </div>
        <div className="col-md-8"></div>
      </div>
    )
  }
};

export default Stories;

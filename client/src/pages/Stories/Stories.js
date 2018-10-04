import React, { Component } from "react";
import './Stories.css';
import { Input, TextArea, FormBtn } from "../../components/StoriesForm";

class Stories extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
      username: "",
      title: "",
      text: ""};
  }

  // componentDidMount() {
  //   this.loadStories();
  // }
  
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
        <div className="col-md-2"></div>
        <div className="col-md-6"></div>
      </div>
    )
  }
};

export default Stories;

// class Stories extends Component {
  
//   constructor(props) {
//     super(props);
//     // this.state = {

//     // };
//   }

//   render() {
//     return (
//       <div className="row">
//         <div className="col-xl-2">
//           {/* Tags/Subcategories would go here */}
//         </div>

//           <div className="col-xl-8">
//             <CategoryDetail>
//               <CategoryDescription />
              
//               <PostList>
//                 <PostListItem>

//                 </PostListItem>
//               </PostList>
          
//             </CategoryDetail>

//           </div>

//         <div className="col-xl-2">
//           {/* Advertisements would go here */}
//         </div>
//       </div>
//     );
//   };

// };
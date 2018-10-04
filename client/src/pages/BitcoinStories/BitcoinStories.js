import React, { Component } from "react";
import './BitcoinStories.css';
import { Input, TextArea, FormBtn } from "../../components/StoriesForm";

class BitcoinStories extends Component {
  state = {
    stories: [],
    username: "",
    title: "",
    text: ""
  };
  //////Logic/////

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

  render() {
    return(
      <div>
        <div className="col-md-4">
        <form>
          <Input 
            value={this.state.title}
            onChange={this.handleInputChange}
            name="title"
            placeholder="Title of your Bitcoin Story"
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
        <div className="col-md-6">
        
        </div>
      </div>
    )
  }
};

export default BitcoinStories;
// class BitcoinStories extends Component {
  
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
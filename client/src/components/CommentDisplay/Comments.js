import React, { Component } from "react";
import { TextArea, FormBtn } from "../PostComponents/PostForm";

export class Comments extends Component  {
    constructor (props) {
        super(props)
        this.state = {
          isHidden: true,
          body: ""
        }
      };

      toggleHidden () {
        this.setState({
          isHidden: !this.state.isHidden
        })
      };

      handleInputChange = event => {
          console.log(this.state)
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    //   handleFormSubmit = (event) => {
    //     console.log(this.state);
    //     event.preventDefault();
    //     const data = {
    //         body: this.state.body,
    //         commentPath: "commentPath"
    //     }
    //     if (this.state.body.length > 4) {
    //         API.createComment(this.state.postID, data)
    //         // .then( res => this.setState({ redirectToNewPage: true }))
    //         .then (res => this.getPostWithComments())
    //         .catch(err => console.log(err))
    //     }
    //   }

    render(){
        console.log(this.props.createdAt)
        const createdDate = this.props.createdAt && this.props.createdAt.slice(0, 10)
        return (
            <React.Fragment>
                <hr/>
                <p><b>Author:</b> {this.props.authorName} [earned $x.xx]</p> 
                <p><b>Comment:</b> {this.props.body}</p>
                <p>[#Upvotes][Upvote MoneyButton Component]</p>
                <p><button onClick={this.toggleHidden.bind(this)}>[Reply]</button></p>
                <p>[Created on: {createdDate}]</p>
                {!this.state.isHidden && <Child />}
            </React.Fragment>
        );
    }   
};

const Child = (props) => (
    <React.Fragment>
        <TextArea 
        value=""
        onChange={this.handleInputChange}
        name="body"
        placeholder="Share your comment here"
        />
        <FormBtn
        // disabled={!(this.state.body.length >4)}
        // onClick={this.handleFormSubmit}
        >
        Submit Comment
        </FormBtn>
    </React.Fragment>
)
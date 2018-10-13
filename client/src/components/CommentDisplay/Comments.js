import React, { Component } from "react";
import { TextArea, FormBtn } from "../PostComponents/PostForm";

export class Comments extends Component  {
    constructor (props) {
        super(props)
        this.state = {
          isHidden: true
        }
      }
      toggleHidden () {
        this.setState({
          isHidden: !this.state.isHidden
        })
      }

    render(){
        console.log(props.createdAt)
        const createdDate = props.createdAt && props.createdAt.slice(0, 10)
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

const Child = () => (
    <React.Fragment>
        <TextArea 
        value=""
        // onChange={this.handleInputChange}
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
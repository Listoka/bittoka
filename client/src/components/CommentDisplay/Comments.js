import React, { Component } from "react";
import { TextArea, FormBtn } from "../PostComponents/PostForm";
import API from '../../utils/API';
import {NestedComments} from '../CommentDisplay/NestedComments';
import Moment from 'react-moment';
import './Comments.css';

export class Comments extends Component  {
    constructor (props) {
        super(props)
        this.state = {
          commentBoxIsHidden: true,
          commentsAreHidden: true
        }
      };

      toggleCommentBox () {
        this.setState({
            commentBoxIsHidden: !this.state.commentBoxIsHidden
        })
      };
      toggleComments () {
        this.setState({
            commentsAreHidden: !this.state.commentsAreHidden
        })
      };

    render(){
        const createdDate = this.props.createdAt && this.props.createdAt.slice(0, 10)
        return (
            <React.Fragment>
                <hr/>
                <div className= 'comment'>
                <p className='smallPostCommentText'>{this.props.authorName}&nbsp;&nbsp;<i className="fas fa-calendar-alt"></i>&nbsp;&nbsp;<Moment fromNow>{this.props.createdAt}</Moment>&nbsp;&nbsp;<i className="fab fa-bitcoin"></i>&nbsp;&nbsp;[earned $x.xx]</p>
                <br></br>  
                <p className='mediumPostText'> {this.props.body}</p>
                <p>[#Upvotes][Upvote MoneyButton Component]</p>
                <p><button className="btn btn-success" onClick={this.toggleCommentBox.bind(this)}>[Reply]</button>&nbsp;&nbsp;</p>
                <p><button type="button" className="btn btn-primary viewButton" onClick={this.toggleComments.bind(this)}>[View Replies <i className="far fa-comment">]</i></button></p>
                {!this.state.commentBoxIsHidden && <CommentBox id={this.props.id} toggleCommentBox = {this.toggleCommentBox}/>}
                {!this.state.commentsAreHidden && <LayeredComments commentID={this.props.id} />}
                </div>
            </React.Fragment>
        );
    };   
};

class LayeredComments extends Component {
    
    constructor (props) {
        super(props)
        this.state = {
          layeredComments: [],
        };
    };

    componentDidMount() {
        this.getLayeredComments()
    };

    getLayeredComments = () => {
        console.log(this.props.commentID)
        API.getLayeredComments(this.props.commentID)
        .then( res => this.setState({ layeredComments: res.data.comments }))
        .then( res => console.log(this.state.layeredComments))
    }

    render() {
        return(
            <React.Fragment>
                <div>
                {this.state.layeredComments.map(comments => (
                    <NestedComments
                    key={comments._id}
                    author={comments.author}
                    authorName={comments.authorName}
                    body={comments.body}
                    createdAt={comments.createdAt}
                    />
                ))}
                </div>
            </React.Fragment>
        );
    };
};

class CommentBox extends Component {
    
    constructor (props) {
        super(props)
        this.state = {
          layeredBody: "",
        };
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    handleFormSubmit = (event) => {
        console.log(this.state);
        event.preventDefault();
        const data = {
            body: this.state.layeredBody
        };
        if (this.state.layeredBody.length > 4) {
            
            API.createLayeredComment(this.props.id, data)
            .then( res => this.setState({ layeredBody: "" }))
            // .then( res => this.state.props.toggleCommentBox())
            // .then (res => this.getPostWithComments())
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        };
    };

    render() {
        return(
        <React.Fragment>
            
            <TextArea 
            value={this.state.layeredBody}
            onChange={this.handleInputChange}
            name="layeredBody"
            placeholder="Share your comment here"
            />
            <FormBtn
            disabled={!(this.state.layeredBody.length>4)}
            onClick={this.handleFormSubmit}
            >
            Submit Comment
            </FormBtn>
        </React.Fragment>
        );
    };
};
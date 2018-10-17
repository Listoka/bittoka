import React, { Component } from "react";
import API from '../../utils/API';
import { PostDetail } from '../../components/PostComponents/PostDetail/PostDetail';
import { Comments, CommentList } from '../../components/CommentDisplay';
// import withAuthorization from '../../components/AuthUserSession/withAuthorization'
/*import TipButton from '../../components/TipButton';*/
import { TextArea, FormBtn } from "../../components/PostComponents/PostForm";
import './content.css';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      comments: [],
      commentBody: "",
    };
  };

  componentDidMount() {
    this.getPostWithComments();
  };

  getPostWithComments = () => {
    API.getPostWithComments(this.props.match.params.id)
      .then(res => this.setState({ post: res.data, comments: res.data.comments, commentBody: "" }))
      // .then (res=> console.log(res.data))
      .catch(err => console.log(err));
  }

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
      body: this.state.commentBody,
      commentPath: "commentPath" // automatically set server-side
    }
    if (this.state.commentBody.length > 4) {
      API.createComment(this.props.match.params.id, data)
        // .then( res => this.setState({ redirectToNewPage: true }))
        .then(res => this.getPostWithComments())
        .catch(err => console.log(err))
    }
  }

  afterPayment = () => {
    alert('Payment successful!')
  }

  render() {
    return (
      <div className="pagebody">
        <React.Fragment>
          <div className="container-fluid">
            <div className="row displayForm">
              <div className="col-xl-2"></div>
              <div className="col-xl-8 formBody rounded">
                <PostDetail className= "containerHeader" key={this.state.post._id} {...this.state.post} />
                <hr />
                <TextArea
                  value={this.state.commentBody}
                  onChange={this.handleInputChange}
                  name="commentBody"
                  placeholder="Share your comment here"
                />
                <FormBtn
                  disabled={!(this.state.commentBody.length > 4)}
                  onClick={this.handleFormSubmit}
                >
                  Submit Comment
                </FormBtn>
                <hr />
                <CommentList>
                  {this.state.comments.map(comment => (
                    <Comments key={comment._id} {...comment} />
                  ))}
                </CommentList>
              </div>
              <div className="col-xl-2"></div>
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  };
};


export default Content;
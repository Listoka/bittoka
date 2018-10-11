import React, { Component } from "react";
import API from '../../utils/API';
import {PostDetail} from '../../components/PostComponents/PostDetail/PostDetail';
import {Comments, CommentList} from '../../components/CommentDisplay';
import withAuthorization from '../../components/AuthUserSession/withAuthorization'

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
        post: {},
        comments: []
    };
  };

  componentDidMount() {
    this.getPost();
    this.displayComments();
  };

  getPost = () => {
    API.getPost(this.props.match.params.id)
    .then(res => this.setState({ post: res.data }))
    .then(res => console.log(this.state.post))
    .catch(err => console.log(err));
  }

  displayComments = () => {
    API.getComments()
    .then(res => this.setState({ comments: res.data }))
    .catch(err => console.log(err));
  }
  //Need to add the function to update here and pass it through into the PostDetail component.
  //I'll need to redirect to the new page where the state is set with the current information, but then it is editable.
  //So The edit button links to a new page. Yours has it setup like that.

    render() {
      return (
        <div>
          <div className="container-fluid">
            <div className="row">
             <div className="col-xl-2"></div>
              <div className="col-xl-8">
                <PostDetail 
                  key={this.state.post._id}
                  authorName={this.state.post.authorName}
                  body={this.state.post.body}
                  categoryName={this.state.post.categoryName}
                  comments={this.state.post.comments}
                  purchasers={this.state.post.purchasers}
                  tags={this.state.post.tags}
                  teaser={this.state.post.teaser}
                  title={this.state.post.title}
                  _id={this.state.post._id}
                  author={this.state.post.author}
                />
                <hr/>
                {/* Need to pull for each particular post. Currently pulls just ALL comments for everything */}
                <CommentList>
                  {this.state.comments.map(comments => (
                      <Comments 
                      key={comments._id}
                      author={comments.author}
                      body={comments.body} 
                      // voters={comments.voters} 
                      comments={comments.comments} 
                      />
                  ))}
                </CommentList>
              </div>
             <div className="col-xl-2"></div>
            </div>
          </div>
        </div>
      );
    };
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(Content);
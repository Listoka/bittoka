import React, { Component } from "react";
import API from '../../utils/API';
import PostDetail from '../../components/PostDetail';
import CommentList from '../../components/CommentList';
import Comments from '../../components/Comments';
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
                <CommentList>
                {console.log(this.state.comments[0])}
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

// export default Content;
export default withAuthorization(authCondition)(Content);
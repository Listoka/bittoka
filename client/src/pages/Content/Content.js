import React, { Component } from "react";
import API from '../../utils/API';
import { PostDetail } from '../../components/PostComponents/PostDetail/PostDetail';
import { Comments, CommentList } from '../../components/CommentDisplay';
// import withAuthorization from '../../components/AuthUserSession/withAuthorization';
/*import TipButton from '../../components/TipButton';*/
import AuthUserContext from '../../components/AuthUserSession/AuthUserContext';
import { PageBody, Row, Button, TextArea, MainWrapper } from '../../components/Widgets';

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
      .catch(err => console.log(err));
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

  render() {
    return (
      <React.Fragment>
      <PageBody>
            <Row>
              <div className="col-md-2"></div>
              <div className="col-md-8">
              <MainWrapper>
                <PostDetail key={this.state.post._id} {...this.state.post} />
                <AuthUserContext.Consumer>
                  {authUser => 
                    authUser
                      ? ( <div>
                          <hr />
                          <TextArea
                            value={this.state.commentBody}
                            onChange={this.handleInputChange}
                            name="commentBody"
                            placeholder="Share your comment here"
                          />
                          <Button 
                            disabled={!(this.state.commentBody.length > 4)} 
                            onClick={this.handleFormSubmit}
                            text='Submit'
                          />
                           <hr/>
                        </div>
                      ) : null
                  }
                </AuthUserContext.Consumer>
                <CommentList>
                  {this.state.comments.map(comment => (
                    <Comments key={comment._id} {...comment} />
                  ))}
                </CommentList>
                </MainWrapper>
                </div>
                <div className="col-md-2"></div>
              </Row>
      </PageBody>
      </React.Fragment>
    );
  };
};


export default Content;
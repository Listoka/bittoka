import React, { Component } from 'react';
import API from '../../utils/API';
import { CategoryDescription, CategoryDetail } from '../../components/CategoryInfoDisplay';
import { PostList, PostListItem } from '../../components/PostComponents/PostListDisplay';
import './Home.css';
import Stickybar from '../../components/Stickybar/Stickybar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homePosts: [],
      displayName: "",
      description: "",
      tags: [],
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    API.getAllPosts().then(results => {
      console.log(results.data);
      this.setState({ homePosts: results.data });
    });
  };

  render() {
    return (
      <div className='pagebody'>
      {/*Will need to find an alternate side bar solution with advertisements */}
      <Stickybar categoryName={this.state.categoryName}></Stickybar>
        <div className='row'>
          <div className='col-lg-2'></div>
          <div className='col-lg-8'>
            {/* <CreatePostButton
              categoryName={this.state.categoryName}
            /> */}
          </div>
          <div className='col-lg-2'>
          </div>
        </div>
        
        <div className='row'>
          <div className='col-sm-2'>
            <div className='homeTagWrapper rounded'>
              <div className='homeSidebarWrapper rounded'>
                <img className="img-fluid" src="./images/newSidebar.jpg" alt="Welcome to Listoka"></img>
                <div className="homeSideBar rounded">
                  <h6>Welcome to Listoka</h6>
                  <p className='homeSidebarContent'><strong>Write something, earn Bitcoin.  It's that simple.</strong></p>
                    <p className='para'>Share a story, create a DIY project, or post your travelog.  Get paid to make Listoka a better place.  
                        Upvote content you like and give the poster or commenter a $0.02 tip.  If you're really impressed, visit the author's profile page and leave a custom tip.
                        Good content deserves support.  So get to to it!  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-8'>
            <CategoryDetail>
              <CategoryDescription
                displayName={this.state.displayName}
                description={this.state.description}
              />
              <PostList>
                {this.state.homePosts.map(homePosts => (
                  <PostListItem
                    key={homePosts._id}
                    authorName={homePosts.authorName}
                    body={homePosts.body}
                    categoryName={homePosts.categoryName}
                    comments={homePosts.comments}
                    purchasers={homePosts.purchasers}
                    tags={homePosts.tags}
                    teaser={homePosts.teaser}
                    title={homePosts.title}
                    _id={homePosts._id}
                    author={homePosts.author}
                    handleDeleteButton={this.handleDeleteButton}
                    createdAt={homePosts.createdAt}
                  />
                ))}
              </PostList>
            </CategoryDetail>
          </div>
          <div className='col-sm-2'>
            {/* Advertisements would go here */}
          </div>
        </div>
      </div>
    );
  };
};

export default Home;

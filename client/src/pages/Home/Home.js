import React, { Component } from 'react';
import API from '../../utils/API';
import { CategoryDescription } from '../../components/CategoryInfoDisplay';
import { PostList, PostListItem } from '../../components/PostComponents/PostListDisplay';
import Stickybar from '../../components/Stickybar/Stickybar';
import sidebarImage from '../../assets/images/sidebar-400x400.jpg'
import { PageBody, Row, MainWrapper } from '../../components/Widgets';

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
      <React.Fragment>
      <PageBody>
      {/*Will need to find an alternate side bar solution with advertisements */}
      <Stickybar categoryName={this.state.categoryName}></Stickybar>
        <Row>
          <div className='col-lg-2'></div>
          <div className='col-lg-8'>
          </div>
          <div className='col-lg-2'>
          </div>
        </Row>
        
        <Row>
          <div className='col-sm-2'>
            <MainWrapper classType='homeTagWrapper'>
              <img className="img-fluid" src={sidebarImage} alt="Welcome to Listoka"></img>
                <h6 className='m-10px p-10px font-bold text-base' >Welcome to Listoka</h6>
                <p className='my-2 text-sm'><strong>Write something, earn Bitcoin.  It's that simple.</strong></p>
                <p className='text-left text-sm'>Share a story, create a DIY project, or post your travelog.  Get paid to make Listoka a better place.  
                  Upvote content you like and give the poster or commenter a $0.02 tip.  If you're really impressed, visit the author's profile page and leave a custom tip.
                  Good content deserves support.  So get to to it!  </p>
            </MainWrapper> 
          </div>

          <div className='col-md-8'>
            <MainWrapper>
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
                    voters={homePosts.voters}
                  />
                ))}
              </PostList>
            </MainWrapper>
          </div>
          <div className='col-sm-2'>
            {/* Advertisements would go here */}
          </div>
        </Row>
      </PageBody>
      </React.Fragment>
    );
  };
};

export default Home;

import React, { Component } from 'react';
import API from '../../utils/API';
import CategoryDetail from '../../components/CategoryDetail';
import CategoryDescription from '../../components/CategoryDescription';
import PostList from '../../components/PostList';
import PostListItem from '../../components/PostListItem';
import CreatePostButton from '../../components/CreatePostButton';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homePosts: [],
    };
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = () => {
    API.getAllPosts().then(results => {
      console.log(results.data);
      this.setState({ homePosts: results.data })
    });
  };

  render() {
    return (
      <div className='row'>
        <div className='col-xl-2'>
          {/* Tags/Subcategories would go here */}
        </div>

          <div className='col-xl-8'>
          <CreatePostButton 
            categoryName={this.state.categoryName}
          />
            <CategoryDetail>
              <CategoryDescription />
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
                  />
                ))}
              </PostList>
            </CategoryDetail> 
          </div>
        <div className='col-xl-2'>
          {/* Advertisements would go here */}
        </div>
      </div>
    );
  };

};
export default Home;

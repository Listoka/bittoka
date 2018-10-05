import React, { Component } from "react";
import './BitcoinStories.css';
import API from '../../utils/API';
import CategoryDetail from '../../components/CategoryDetail';
import CategoryDescription from '../../components/CategoryDescription';
import PostList from '../../components/PostList';
import PostListItem from '../../components/PostListItem';
import CreatePostButton from '../../components/CreatePostButton';

class BitcoinStories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    this.getPosts()
  }
  
  getPosts = () => {
    API.getBitcoinStoryPosts().then(results => {
      console.log(results.data);
      this.setState({stories: results.data})
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xl-2">
            {/* Tags/Subcategories would go here */}
          </div>

          <div className="col-xl-8">
          <CreatePostButton 

          />
            <CategoryDetail>
              <CategoryDescription />

              <PostList>
                {this.state.stories.map(bitcoinStory => (
                  <PostListItem
                    key={bitcoinStory._id}
                    authorName={bitcoinStory.authorName}
                    body={bitcoinStory.body}
                    categoryName={bitcoinStory.categoryName}
                    comments={bitcoinStory.comments}
                    purchasers={bitcoinStory.purchasers}
                    tags={bitcoinStory.tags}
                    teaser={bitcoinStory.teaser}
                    title={bitcoinStory.title}
                    _id={bitcoinStory._id}
                    author={bitcoinStory.author}//This is the numbers one. May not need
                    // 
                  />
                ))}
              </PostList>

            </CategoryDetail>

          </div>

          <div className="col-xl-2">
            {/* Advertisements would go here */}
          </div>
        </div>
      </div>
    )
  }
};

export default BitcoinStories;
import React, { Component } from "react";
import './BitcoinStories.css';
import API from '../../utils/API';
import CategoryDetail from '../../components/CategoryDetail';
import CategoryDescription from '../../components/CategoryDescription';
import PostList from '../../components/PostList';
import PostListItem from '../../components/PostListItem';
import CreatePostButton from '../../components/CreatePostButton';
import TagWrapper from '../../components/TagWrapper';
import Tags from '../../components/Tags';

class BitcoinStories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bitcoinStories: [],
      categoryName: "bitcoin-story",
      displayName: "",
      description: "",
      tags: []
    };
  }

  componentDidMount() {
    this.getPosts(this.state.categoryName)
  }

  getPosts = (categoryName) => {
    console.log(categoryName)
    API.getPostings(categoryName).then(results => {
      console.log(results.data);
      this.setState({ bitcoinStories: results.data });
      this.getCategory(this.state.categoryName);
    });
  };

  getCategory = (categoryName) => {
    API.getCategoryInfo(categoryName).then(results => {
      this.setState({
        displayName: results.data.displayName,
        description: results.data.description,
        tags: results.data.tags
      })
      //console.log(this.state);
    });
  };

  render() {
    return (
      <div className='pagebody'>
        <div className='row'>
          <div className='col-xl-2'></div>
          <div className='col-xl-8'>
            <CreatePostButton
              categoryName={this.state.categoryName}
            />
          </div>
          <div className='col-xl-2'></div>
        </div>

        <div className='row'>
          <div className='col-xl-2'>
            <TagWrapper>
              {this.state.tags.map(tags => (
                <Tags
                  tag={tags}
                />
              ))}
            </TagWrapper>
          </div>

          <div className='col-xl-8'>
            <CategoryDetail>
              <CategoryDescription
                displayName={this.state.displayName}
                description={this.state.description}
              />
              <PostList>
                {this.state.bitcoinStories.map(bitcoinStory => (
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
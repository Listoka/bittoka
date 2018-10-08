import React, { Component } from "react";
import API from '../../utils/API';
import './Stories.css';
import CategoryDetail from '../../components/CategoryDetail';
import CategoryDescription from '../../components/CategoryDescription';
import PostList from '../../components/PostList';
import PostListItem from '../../components/PostListItem';
import CreatePostButton from '../../components/CreatePostButton';
import TagWrapper from '../../components/TagWrapper';
import Tags from '../../components/Tags';

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
      categoryName: "stories",
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
      this.setState({ stories: results.data });
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
                {this.state.stories.map(story => (
                  <PostListItem
                    key={story._id}
                    authorName={story.authorName}
                    body={story.body}
                    categoryName={story.categoryName}
                    comments={story.comments}
                    purchasers={story.purchasers}
                    tags={story.tags}
                    teaser={story.teaser}
                    title={story.title}
                    _id={story._id}
                    author={story.author}//This is the numbers one. May not need
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

export default Stories;
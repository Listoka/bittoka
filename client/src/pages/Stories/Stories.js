import React, { Component } from "react";
import API from '../../utils/API';
import './Stories.css';
import {CategoryDescription, CategoryDetail} from '../../components/CategoryInfoDisplay';
import {PostList, PostListItem} from '../../components/PostComponents/PostListDisplay';
import {CreatePostButton} from '../../components/ButtonComponents/CreatePostButton';
import {Tags, TagWrapper} from '../../components/TagDisplay';

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
  };

  componentDidMount() {
    const categoryName = this.state.categoryName

    let promises = [this.getPosts(categoryName), this.getCategory(categoryName)]
    Promise.all(promises)
      .then(results => {
        this.setState({
          stories: results[0].posts,
          displayName: results[1].displayName,
          description: results[1].description,
          tags: results[1].tags
        });
      });
  };

  getPosts = (categoryName) => {
    return API.getPostings(categoryName).then(results => results.data);
  };

  getCategory = (categoryName) => {
    return API.getCategoryInfo(categoryName).then(results => results.data);
  };

  handleDeleteButton = (event, id) => {
    event.preventDefault();
    API.deletePost(id)
    .then(res => {
      this.updateAfterDelete(id)
    })
    .catch(err => console.log(err));
  }

  updateAfterDelete = (id) => {
    return API.getUserPosts(id).then(res => this.setState({userPosts: res.data}))
  }

  render() {
    return (
      <div className='pagebody'>
        <div className='row'>
          <div className='col-lg-2'></div>
          <div className='col-lg-8'>
            <CreatePostButton
              categoryName={this.state.categoryName}
            />
          </div>
          <div className='col-lg-2'></div>
        </div>

        <div className='row'>
          <div className='col-lg-2'>
            <TagWrapper>
              {this.state.tags.map(tags => (
                <Tags
                  key={tags}
                  tag={tags}
                />
              ))}
            </TagWrapper>
          </div>

          <div className='col-lg-8'>
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
                    author={story.author}
                    handleDeleteButton={this.handleDeleteButton}
                  // 
                  />
                ))}
              </PostList>
            </CategoryDetail>
          </div>
          <div className="col-lg-2">
            {/* Advertisements would go here */}
          </div>
        </div>
      </div>
    )
  }
};

export default Stories;
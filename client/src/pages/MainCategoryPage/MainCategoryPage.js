import React, { Component } from 'react';
import API from '../../utils/API';
import {CategoryDescription, CategoryDetail} from '../../components/CategoryInfoDisplay';
import PostList from '../../components/PostList';
import PostListItem from '../../components/PostListItem';
import CreatePostButton from '../../components/CreatePostButton';
import TagWrapper from '../../components/TagWrapper';
import Tags from '../../components/Tags';

class MainCategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryPosts: [],//Update whenever a new category is clicked on
      categoryName: "stories",//Will come in with API call
      displayName: "",
      description: "",
      tags: [],
    };
  };

  componentDidMount() {
    const categoryName = this.state.categoryName;
    this.promiseCategories(categoryName);

    // let promises = [this.getPosts(categoryName), this.getCategory(categoryName)]
    // Promise.all(promises)
    //   .then(results => {
    //     this.setState({
    //       categoryPosts: results[0].posts,
    //       displayName: results[1].displayName,
    //       description: results[1].description,
    //       tags: results[1].tags
    //     })
    //   })
  };

  handleCategoryChange = category => {
    this.promiseCategories(category);
    // this.setState({categoryName: category})
  };

  promiseCategories = (category) => {
    let promises = [this.getPosts(category), this.getCategory(category)]
    Promise.all(promises)
      .then(results => {
        this.setState({
          categoryPosts: results[0].posts,
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

          <div className='col-sm-8'>
            <CategoryDetail>
              <CategoryDescription
                displayName={this.state.displayName}
                description={this.state.description}
              />
              <PostList>
                {this.state.categoryPosts.map(categoryPost => (
                  <PostListItem
                    key={categoryPost._id}
                    authorName={categoryPost.authorName}
                    body={categoryPost.body}
                    categoryName={categoryPost.categoryName}
                    comments={categoryPost.comments}
                    purchasers={categoryPost.purchasers}
                    tags={categoryPost.tags}
                    teaser={categoryPost.teaser}
                    title={categoryPost.title}
                    _id={categoryPost._id}
                    author={categoryPost.author}
                    handleDeleteButton={this.handleDeleteButton}
                  />
                ))}
              </PostList>
            </CategoryDetail>
          </div>
          <div className='col-xl-2'>
            {/* Advertisements would go here */}
          </div>
        </div>
      </div>
    );
  };

};
export default MainCategoryPage;

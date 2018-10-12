import React, { Component } from 'react';
import API from '../../utils/API';
import {CategoryDescription, CategoryDetail} from '../../components/CategoryInfoDisplay';
import {PostList, PostListItem} from '../../components/PostComponents/PostListDisplay';
import {CreatePostButton} from '../../components/ButtonComponents/CreatePostButton';
import {Tags, TagWrapper} from '../../components/TagDisplay';

class MainCategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryPosts: [],//Update whenever a new category is clicked on
      // categoryName: "listoka",
      // displayName: "",
      // description: "",
      // tags: [],
      userPosts: ""
    };
  };

  componentDidMount() {
    // const categoryName = this.state.categoryName;
    // this.promiseCategories(categoryName);
    console.log(this.props)

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

  handleDeleteButton = (event, id) => {
    event.preventDefault();
    API.deletePost(id)
    .then(res => {
      this.updateAfterDelete(id)
    })
    .catch(err => console.log(err));
  }

  updateAfterDelete = (id) => {
    return API.getUserPosts(id).then(res => this.setState({categoryPosts: res.data}))
  }
  
  render() {
    return (
      <div className='pagebody'>
        <div className='row'>
          <div className='col-lg-2'></div>
          <div className='col-lg-8'>
            <CreatePostButton
              categoryName={this.props.categoryName}
            />
          </div>
          <div className='col-lg-2'></div>
        </div>

        <div className='row'>
          <div className='col-lg-2'>
            <TagWrapper>
              {this.props.tags.map(tags => (
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
                displayName={this.props.displayName}
                description={this.props.description}
              />
              <PostList>
                {this.props.categoryPosts.map(categoryPost => (
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

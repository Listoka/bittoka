import React, { Component } from 'react';
import API from '../../utils/API';
import {CategoryDescription, CategoryDetail} from '../../components/CategoryInfoDisplay';
import {PostList, PostListItem} from '../../components/PostListDisplay';
import CreatePostButton from '../../components/CreatePostButton';
import {Tags, TagWrapper} from '../../components/TagDisplay';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homePosts: [],
      categoryName: "",
      displayName: "",
      description: "",
      tags: [],
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    //console.log(categoryName)
    API.getAllPosts().then(results => {
      console.log(results.data);
      this.setState({ homePosts: results.data });
    });
  };


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
          <div className='col-sm-2'>
            {/* Advertisements would go here */}
          </div>
        </div>
      </div>
    );
  };
};

export default Home;

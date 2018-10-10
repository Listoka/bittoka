import React, { Component } from 'react';
import API from '../../utils/API';
import { CategoryDescription, CategoryDetail } from '../../components/CategoryInfoDisplay';
import PostList from '../../components/PostList';
import PostListItem from '../../components/PostListItem';
import CreatePostButton from '../../components/CreatePostButton';
import TagWrapper from '../../components/TagWrapper';
import Tags from '../../components/Tags';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listokaPosts: [],
      categoryName: "listoka",
      displayName: "",
      description: "",
      tags: [],
      homePosts: [],
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = (categoryName) => {
    //console.log(categoryName)
    API.getPostings(categoryName).then(results => {
      console.log(results.data);
      this.getCategory(this.state.categoryName);
      this.setState({ homePosts: results.data });
    });
  };

  getCategory = (categoryName) => {
    API.getCategoryInfo(categoryName).then(results => {
      this.setState({
        displayName: results.data.displayName,
        description: results.data.description,
        tags: results.data.tags
      });
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

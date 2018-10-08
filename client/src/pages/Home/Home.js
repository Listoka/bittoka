import React, { Component } from 'react';
import API from '../../utils/API';
import CategoryDetail from '../../components/CategoryDetail';
import CategoryDescription from '../../components/CategoryDescription';
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
      tags: []
    };
  }

  componentDidMount() {
    this.getPosts(this.state.categoryName);
  }

  getPosts = (categoryName) => {
    //console.log(categoryName)
    API.getPostings(categoryName).then(results => {
      console.log(results.data);
      this.getCategory(this.state.categoryName);
      this.setState({ listokaPosts: results.data });
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
                {this.state.listokaPosts.map(listokaPost => (
                  <PostListItem
                    key={listokaPost._id}
                    authorName={listokaPost.authorName}
                    body={listokaPost.body}
                    categoryName={listokaPost.categoryName}
                    comments={listokaPost.comments}
                    purchasers={listokaPost.purchasers}
                    tags={listokaPost.tags}
                    teaser={listokaPost.teaser}
                    title={listokaPost.title}
                    _id={listokaPost._id}
                    author={listokaPost.author}//This is the numbers one. May not need
                  // 
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

export default Home;

import React, { Component } from 'react';
import API from '../../utils/API';
import CategoryDetail from '../../components/CategoryDetail';
import CategoryDescription from '../../components/CategoryDescription';
import PostList from '../../components/PostList';
import PostListItem from '../../components/PostListItem';
import CreatePostButton from '../../components/CreatePostButton';
import './Listoka.css';

class Listoka extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listokaPosts: [],
      categoryName: "listoka"
    };
  }

  componentDidMount() {
    this.getPosts(this.state.categoryName)
  }

  getPosts = (categoryName) => {
    console.log(categoryName)
    API.getPostings(categoryName).then(results => {
      console.log(results.data);
      this.setState({ listokaPosts: results.data })
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
    );
  };

};
export default Listoka;

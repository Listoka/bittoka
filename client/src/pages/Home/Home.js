import React, { Component } from 'react';
// import CategoryDetail from '../../components/CategoryDetail';
// import CategoryDescription from '../../components/CategoryDescription';
// import PostList from '../../components/PostList';
// import PostListItem from '../../components/PostListItem';
// import CreatePostButton from '../../components/CreatePostButton';
import './Home.css';

class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  render() {

    return (
      <div className='row'>
        <div className='col-xl-2'>
          {/* Tags/Subcategories would go here */}
        </div>

          <div className='col-xl-8'>
          {/* <CreatePostButton 

          />
            <CategoryDetail>
              <CategoryDescription />
              <PostList>

                <PostListItem>

                </PostListItem>

              </PostList>
          
            </CategoryDetail> */}

          </div>

        <div className='col-xl-2'>
          {/* Advertisements would go here */}
        </div>
      </div>
    );
  };

};
export default Home;

import React, { Component } from "react";
import './Stories.css';
// import CategoryDetail from '../../components/CategoryDetail';
// import CategoryDescription from '../../components/CategoryDescription';
// import PostList from '../../components/PostList';
// import PostListItem from '../../components/PostListItem';
// import CreatePostButton from '../../components/CreatePostButton';

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xl-2">
            {/* Tags/Subcategories would go here */}
          </div>

          <div className="col-xl-8">
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

          <div className="col-xl-2">
            {/* Advertisements would go here */}
          </div>
        </div>
      </div>
    )
  }
};

export default Stories;
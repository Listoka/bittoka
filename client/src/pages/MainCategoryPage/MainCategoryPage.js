import React, { Component } from 'react';
import API from '../../utils/API';
import { CategoryDescription, CategoryDetail } from '../../components/CategoryInfoDisplay';
import { PostList, PostListItem } from '../../components/PostComponents/PostListDisplay';
import { CreatePostButton } from '../../components/ButtonComponents/CreatePostButton';
import posed, { PoseGroup } from "react-pose";
import Stickybar from '../../components/Stickybar/Stickybar';

const Sidebar = posed.ul({
  open: {
    x: '0%',
    delayChildren: 300,
    staggerChildren: 50
  },
  closed: { x: '-100%', delay: 300}
});

const Item = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
});

class MainCategoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryPosts: [],
      userPosts: "",
    };
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
    return API.getUserPosts(id).then(res => this.setState({ categoryPosts: res.data }))
  }

  render() {
    const { isOpen } = this.props;

    return (
      <div className='pagebody'>
      <Stickybar></Stickybar>
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
          <div className='col-sm-2'>
            <div className='tagWrapper rounded'>
            <div className='headWrapper'>
                <p>Tags</p>
              </div>
              <Sidebar id="tagUl" pose={isOpen ? 'open' : 'closed'}>
                {this.props.tags.sort().map(tags => (
                  <Item className='tagLink' >
                    {tags}
                  </Item>        
                ))}
              </Sidebar>
            </div>
            </div>

            <div className='col-md-8'>
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
            <div className='col-sm-2'>
              {/* Advertisements would go here */}
            </div>
          </div>
        </div>
        );
      };
    
    };
    export default MainCategoryPage;

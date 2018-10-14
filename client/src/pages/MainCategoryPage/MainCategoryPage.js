import React, { Component } from 'react';
import API from '../../utils/API';
import { CategoryDescription, CategoryDetail } from '../../components/CategoryInfoDisplay';
import { PostList, PostListItem } from '../../components/PostComponents/PostListDisplay';
import { CreatePostButton } from '../../components/ButtonComponents/CreatePostButton';
import posed, { PoseGroup } from "react-pose";

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
    console.log('props', props)
    this.state = {
      posts: [],
      tags: [],
      categoryDisplayName: '',
      categoryDescription: ''
    };
    this.categoryName = props.match.params.categoryName
  };

  getCategoryAndPosts = () => {
    API.getPostings(this.categoryName)
      .then((result) => {
        const { category, posts } = result.data
        this.setState({
          categoryDescription: category.description,
          categoryDisplayName: category.displayName,
          posts: posts,
          tags: category.tags
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getCategoryAndPosts()
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate')

  }

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
                {this.state.tags.sort().map(tags => (
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
                  displayName={this.state.categoryDisplayName}
                  description={this.state.categoryDescription}
                />
                
                <PostList>
                  {this.state.posts.map(post => (
                    <PostListItem
                      key={post._id}
                      authorName={post.authorName}
                      body={post.body}
                      categoryName={post.categoryName}
                      comments={post.comments}
                      purchasers={post.purchasers}
                      tags={post.tags}
                      teaser={post.teaser}
                      title={post.title}
                      _id={post._id}
                      author={post.author}
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

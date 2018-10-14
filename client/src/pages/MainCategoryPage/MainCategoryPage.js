import React, { Component } from 'react';
import API from '../../utils/API';
import { CategoryDescription, CategoryDetail } from '../../components/CategoryInfoDisplay';
import { PostList, PostListItem } from '../../components/PostComponents/PostListDisplay';
import { CreatePostButton } from '../../components/ButtonComponents/CreatePostButton';
import posed from "react-pose";
import Stickybar from '../../components/Stickybar/Stickybar';

const Sidebar = posed.ul({
  open: {
    x: '0%',
    delayChildren: 300,
    staggerChildren: 50
  },
  closed: { x: '-100%', delay: 300 }
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
      categoryDescription: '',
      categoryName: '',
    };
  };

  getCategoryAndPosts = () => {
    API.getPostings(this.props.match.params.categoryName)
      .then((result) => {
        console.log(result.data);
        const { category, posts } = result.data
        this.setState({
          categoryDescription: category.description,
          categoryDisplayName: category.displayName,
          posts: posts,
          tags: category.tags,
          categoryName: category.name,
          isOpen: false
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getCategoryAndPosts();
    setTimeout(this.toggle, 1000);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  componentDidUpdate(prevProps) {
    if (this.props.match.params.categoryName !== prevProps.match.params.categoryName) {
      this.getCategoryAndPosts();
      setTimeout(this.toggle, 1000);
    }
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
    const { isOpen } = this.state;

    return (
      <div className='pagebody'>
        <Stickybar categoryName={this.state.categoryName}></Stickybar>
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
          <div className='col-sm-2'>
            <div className='tagWrapper rounded'>
              <div className='headWrapper'>
                <p>Tags</p>
              </div>
              <Sidebar id="tagUl" pose={isOpen ? 'open' : 'closed'}>
                {this.state.tags.sort().map(tags => (
                  <Item className='tagLink' key={tags}>
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
                      createdAt={post.createdAt}
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

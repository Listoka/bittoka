import React, { Component } from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import { CategoryDescription } from '../../components/CategoryInfoDisplay';
import { PostListItem } from '../../components/PostComponents/PostListDisplay';
import { Button } from '../../components/Widgets/Button'
import posed from 'react-pose';
import Stickybar from '../../components/Stickybar/Stickybar';
import AuthUserContext from '../../components/AuthUserSession/AuthUserContext';
import { PageBody, Row, MainWrapper } from '../../components/Widgets';

class MainCategoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      tags: [],
      selectedTags: [],
      filteredPosts: [],
      categoryDisplayName: '',
      categoryDescription: '',
      categoryName: ''
    };
  };

  getCategoryAndPosts = () => {
    API.getPostings(this.props.match.params.categoryName)
      .then((result) => {
        //console.log(result.data);
        const { category, posts } = result.data
        this.setState({
          categoryDescription: category.description,
          categoryDisplayName: category.displayName,
          posts: posts,
          tags: category.tags,
          selectedTags: [],
          filteredPosts: posts,
          categoryName: category.name
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getCategoryAndPosts();
  }

  toggleSelectTag = (event, tag) => {
    event.target.classList.toggle('tagLinkInactive');
    event.target.classList.toggle('tagLinkActive');
    
    let selectedTags, filteredPosts
    if (this.state.selectedTags.includes(tag)) {
      selectedTags = this.state.selectedTags.filter(t => t !== tag)
    } else {
      selectedTags = this.state.selectedTags.concat(tag).sort()
    }

    filteredPosts = this.state.posts.filter(post => {
      if (selectedTags.length === 0) {
        return true
      } else {
        return post.tags.some(t => selectedTags.includes(t))
      }
    })
    this.setState({ selectedTags, filteredPosts })
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.categoryName !== prevProps.match.params.categoryName) {
      this.getCategoryAndPosts();
    }
  }

  render() {

    return (
      <PageBody>
        <Stickybar categoryName={this.state.categoryName}></Stickybar>
        <Row>
          <div className='col-lg-2'></div>
          <div className='col-lg-8'>
            <AuthUserContext.Consumer>
              {
                authUser => authUser ? 
                <Link to={{pathname:`/categories/${this.state.categoryName}/posts/new`}}>
                  <Button text='Create Post' />
                </Link> : null
              }
            </AuthUserContext.Consumer>
          </div>
          <div className='col-lg-2'></div>
        </Row>

        <Row>
          <div className='col-sm-2'>
            <MainWrapper styles={'tagWrapper'}>
              <p className='text-left font-bold mb-1'>Tags</p>
              <Sidebar id="tagUl" pose={isOpen ? 'open' : 'closed'}>
                {this.state.tags.sort().map(tag => (
                  <li className='tagLink rounded tagLinkInactive' key={tag} onClick={(event) => this.toggleSelectTag(event, tag)}>
                  {tag}
                  </li>
                ))}
              </Sidebar>
            </MainWrapper>
          </div>

          <div className='col-md-8'>
            <MainWrapper>
              <CategoryDescription
                displayName={this.state.categoryDisplayName}
                description={this.state.categoryDescription}
              />
              <div className='container postList'>
                {this.state.filteredPosts
                  .map(post => (
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
                        createdAt={post.createdAt}
                        voters={post.voters}
                      />
                  ))}
              </div>
            </MainWrapper>
          </div>
          <div className='col-sm-2'>
            {/* Advertisements would go here */}
          </div>
        </Row>
      </PageBody>
    );
  };
};
export default MainCategoryPage;

import React, { Component } from 'react';
import API from '../../utils/API';
import { CategoryDescription, CategoryDetail } from '../../components/CategoryInfoDisplay';
import { PostListItem } from '../../components/PostComponents/PostListDisplay';
import { CreatePostButton } from '../../components/ButtonComponents/CreatePostButton';
import Stickybar from '../../components/Stickybar/Stickybar';
import AuthUserContext from '../../components/AuthUserSession/AuthUserContext'

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
      <div className='pagebody'>
        <Stickybar categoryName={this.state.categoryName}></Stickybar>
        <div className='row'>
          <div className='col-lg-2'></div>
          <div className='col-lg-8'>
            <AuthUserContext.Consumer>
              {
                authUser => authUser ? <CreatePostButton categoryName={this.state.categoryName} /> : null
              }
            </AuthUserContext.Consumer>
          </div>
          <div className='col-lg-2'></div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <div className='tagWrapper rounded'>
              <div className='headWrapper'>
                <p>Tags</p>
              </div>
              <ul id='tagUl'>
                {this.state.tags.sort().map(tag => (
                  <li className='tagLink rounded tagLinkInactive' key={tag} onClick={(event) => this.toggleSelectTag(event, tag)}>
                  {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='col-md-8'>
            <CategoryDetail>
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

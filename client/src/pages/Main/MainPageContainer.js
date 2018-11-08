import React from 'react'
import MainPage from './MainPage'
import API from '../../utils/API';

const nullCategory = {
  categoryName: '',
  categoryDisplayName: '',
  categoryDescription: '',
  categoryTags: [],
  categorySettings: null,
}

class MainPageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      filteredPosts: [],
      selectedTags: [],
      ...nullCategory
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.categoryName !== prevProps.match.params.categoryName) {
      this.fetchData();
    }
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

    if (selectedTags.length === 0) {
      filteredPosts = this.state.posts
    } else {
      filteredPosts = this.state.posts.filter(post => {
        return post.tags.some(t => selectedTags.includes(t))
      })
    }

    this.setState({ selectedTags, filteredPosts })
  }

  fetchData() {
    const p = this.props
    const categoryName = (p.match && p.match.params.categoryName) || null
    if (categoryName) {
      this.fetchCategoryAndPosts(categoryName)
    } else {
      this.fetchDefault()
    }
  }

  fetchCategoryAndPosts(categoryName) {
    return API.getCategoryAndPosts(categoryName)
      .then(result => result.data)
      .then(({ category, posts }) => {
        this.setState({
          categoryName: category.name,
          categoryDisplayName: category.displayName,
          categoryDescription: category.description,
          categoryTags: category.tags,
          posts: posts,
          filteredPosts: posts
        })
      })
      .catch(err => console.log('fetchCategoryAndPosts Err: ', err))
  }

  fetchDefault() {
    return API.getAllPosts()
      .then(result => result.data)
      .then(posts => this.setState({ filteredPosts: posts, ...nullCategory, posts }))
      .catch(err => console.log('fetchDefault Err: ', err))
  }

  render() {
    return <MainPage toggleSelectTag={this.toggleSelectTag} {...this.state} />
  }
}

export default MainPageContainer
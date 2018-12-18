import React from 'react'
import MainPage from './MainPage'
import API from '../../utils/API';
import categories from '../../categories.json';
import SubNav from '../../components/subNav';

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
      page: 1,
      limit: 10,
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
        return selectedTags.every(t => post.tags.includes(t))
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

  fetchMorePosts = () => {
    let { categoryName, page, limit } = this.state
    let promise
    page++

    if (categoryName) {
      promise = API.getCategoryAndPosts(categoryName, { page, limit })
    } else {
      promise = API.getAllPosts({ page, limit })
    }

    promise
      .then(result => categoryName ? result.data.posts : result.data)
      .then(posts => {
        this.setState({
          posts: [...this.state.posts, ...posts],
          selectedTags: [],
          filteredPosts: [...this.state.posts, ...posts],
          page
        })
      })
      .catch(err => console.log('fetchMorePosts ERR: ', err))
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
          filteredPosts: posts,
          page: 1,
        })
      })
      .catch(err => console.log('fetchCategoryAndPosts Err: ', err))
  }

  fetchDefault() {
    return API.getAllPosts()
      .then(result => result.data)
      .then(posts => this.setState({ filteredPosts: posts, page: 1, ...nullCategory, posts }))
      .catch(err => console.log('fetchDefault Err: ', err))
  }

  render() {
    return (
      <React.Fragment>
        <div className='flex flex-wrap flex-row items-center justify-center'>
          {categories.map(category => (
            <SubNav
              id={category.id}
              key={category.id}
              href={category.href}
              name={category.name}
            />
          ))}
        </div>
        <MainPage
          toggleSelectTag={this.toggleSelectTag}
          fetchMorePosts={this.fetchMorePosts}
          {...this.state}
        />
      </React.Fragment>
    )
  }
}

export default MainPageContainer
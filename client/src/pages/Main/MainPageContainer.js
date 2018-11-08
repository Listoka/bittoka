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
          posts: posts
        })
      })
      .catch(err => console.log('fetchCategoryAndPosts Err: ', err))
  }

  fetchDefault() {
    return API.getAllPosts()
      .then(result => result.data)
      .then(posts => this.setState({ ...nullCategory, posts }))
      .catch(err => console.log('fetchDefault Err: ', err))
  }

  render() {
    return <MainPage {...this.state} />
  }
}

export default MainPageContainer
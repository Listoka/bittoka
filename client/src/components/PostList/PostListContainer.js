import React from 'react'
import PostListDisplay from './PostListDisplay';
import SortControlBar from './SortControlBar'
import API from '../../utils/API'

class PostListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      filteredPosts: [],
      selectedTags: [],
      sortOrder: 'desc',
      sortType: 'votes',
      page: 1,
      limit: 10,
      days: null,
      noMoreResults: false,
      freeOnly: false
    }
  }

  toggleFreeOnly = () => this.changeQueryOptions({ freeOnly: !this.state.freeOnly })
  setSortDesc = () => this.changeQueryOptions({ sortOrder: 'desc' })
  setSortAsc = () => this.changeQueryOptions({ sortOrder: 'asc' })
  setSortVotes = () => this.changeQueryOptions({ sortType: 'votes' })
  setSortTime = () => this.changeQueryOptions({ sortType: 'time' })
  setSortDays = days => this.changeQueryOptions({ days })

  changeQueryOptions = newState => {
    this.setState(
      () => newState,
      () => this.fetchWithStateOptions(true)
    )
  }

  componentDidMount() {
    // fetchData takes a boolean, true = get page 1
    this.fetchWithStateOptions(true)
  }

  componentDidUpdate(prevProps) {
    if (this.props.categoryName !== prevProps.categoryName) {
      this.fetchWithStateOptions(true);
    }
  }

  toggleSelectTag = (event, tag) => {
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

  fetchWithStateOptions = (pageOne = false) => {
    const { categoryName, userId } = this.props
    const { page, limit, sortOrder, sortType, days, freeOnly } = this.state
    const params = {
      page: pageOne ? 1 : page + 1,
      limit: limit,
      order: sortOrder,
      by: sortType
    }

    if (categoryName) params.category = categoryName
    if (userId) params.userId = userId
    if (days) params.days = days
    if (freeOnly) params.maxCost = 0

    return this.fetchData(params)
  }

  fetchData(params) {
    return API.getPosts(params)
      .then(result => result.data)
      .then(posts => {
        const pageOne = params.page === 1
        // console.log('fetchData pageOne: ', pageOne)
        // console.log('fetchData posts: ', posts)
        this.setState({
          posts: pageOne ? posts : [...this.state.posts, ...posts],
          filteredPosts: pageOne ? posts : [...this.state.posts, ...posts],
          selectedTags: [],
          page: params.page,
          limit: params.limit,
          sortOrder: params.order,
          sortType: params.by,
          days: params.days,
          noMoreResults: posts.length < params.limit // nothing else to get!
        })
      })
  }

  render() {
    const { categoryName, categoryTags, renderTagFilter } = this.props
    const { posts, ...otherState } = this.state
    return (
      <React.Fragment>
        <SortControlBar
          days={this.state.days}
          freeOnly={this.state.freeOnly}
          sortOrder={this.state.sortOrder}
          sortType={this.state.sortType}
          setSortAsc={this.setSortAsc}
          setSortDesc={this.setSortDesc}
          setSortVotes={this.setSortVotes}
          setSortTime={this.setSortTime}
          setSortDays={this.setSortDays}
          toggleFreeOnly={this.toggleFreeOnly}
        />
        <PostListDisplay
          fetchMorePosts={this.fetchWithStateOptions}
          toggleSelectTag={this.toggleSelectTag}
          categoryName={categoryName}
          categoryTags={categoryTags}
          renderTagFilter={renderTagFilter}
          {...otherState}
        />
      </React.Fragment>
    )
  }
}

export default PostListContainer
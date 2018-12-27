import React from 'react'
import MainPage from './MainPage'

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
      ...nullCategory
    }
  }

  componentDidMount() {
    // don't try to load anything until the top-level App component has loaded category data
    if (this.props.categories.length === 0) return

    this.setCategory()
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.categoryName !== prevProps.match.params.categoryName
      || this.props.categories !== prevProps.categories) {
      this.setCategory();
    }
  }

  setCategory() {
    const p = this.props
    const categoryName = (p.match && p.match.params.categoryName) || null
    if (categoryName) {
      const category = this.props.categories.find(c => c.name === categoryName)
      if (category) {
        this.setState({
          categoryName: category.name,
          categoryDisplayName: category.displayName,
          categoryDescription: category.description,
          categoryTags: category.tags,
          categorySettings: category.settings
        })
      }
    } else {
      this.setState({ ...nullCategory })
    }
  }

  render() {
    return <MainPage {...this.state} />
  }
}

export default MainPageContainer
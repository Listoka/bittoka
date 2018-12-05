import React from 'react'
import PublishPostModal from './PublishPostModal';

class PublishPostModalContainer extends React.Component {
  constructor(props) {
    super(props)
    const initialTeaser = this.props.teaser || ''
    this.state = {
      isValid: false,
      teaser: initialTeaser,
      categories: [],
      categoryName: initialCategoryName,
      categoryDisplayName: '',
      selectedCategoryName: '',
      selectedTags: [],
      dropdownOpen: false,
      selectedOptions: null,
    }
  }

  onTeaserChange = e => {
    this.props.onTeaserChange(e)
    this.setState({ teaser: e.target.value })
  }

  render() {
    return (
      <PublishPostModal
        onTeaserChange={this.onTeaserChange}
        {...this.state}
      />
    )
  }
}

export default PublishPostModalContainer
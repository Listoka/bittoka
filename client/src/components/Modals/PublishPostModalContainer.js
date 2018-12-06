import React from 'react'
import PublishPostModal from './PublishPostModal';

// there's maybe a better way to do this, but the idea here is to copy
// the relevant state from the editorPageContainer and keep it locally to
// this component.  Due to the way that the modal launcher context and
// withModals HOC are structured, there is not a good way to pass actual
// props, so instead we copy state, modify it locally, then pass it all back
// to the editorPageContainer component with a bound function

class PublishPostModalContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: false,
      ...this.props
    }
  }

  onTeaserChange = e => {
    this.props.onTeaserChange(e)
    this.setState({ teaser: e.target.value })
  }

  closeAndUpdate = () => {
    this.props.setPostSettings(this.state)
    this.props.closeModal()
  }

  onCategorySelectChange = (event) => {
    console.log('dropdownChange event', event)
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      categoryName: event.value,
      categoryDisplayName: this.state.categories.find(c => c.value === event.value).label,
      tags: event.tags,
      selectedTagObjects: null,
      selectedTags: null,
    })
  };

  onTagSelectChange = selectedTagObjects => {
    this.setState({
      selectedTagObjects,
      selectedTags: selectedTagObjects.map(tag => tag.value)
    });
  };

  render() {
    return (
      <PublishPostModal
        {...this.state}
        onTeaserChange={this.onTeaserChange}
        onCategorySelectChange={this.onCategorySelectChange}
        onTagSelectChange={this.onTagSelectChange}
        closeModal={this.closeAndUpdate}
      />
    )
  }
}

export default PublishPostModalContainer
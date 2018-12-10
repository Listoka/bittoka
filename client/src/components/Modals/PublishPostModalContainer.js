import React from 'react'
import PublishPostModal from './PublishPostModal';
import { stateToHTML } from 'draft-js-export-html'
import API from '../../utils/API';

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

  onTeaserChange = e => this.setState({ teaser: e.target.value })
  onPaywallCostChange = e => this.setState({ paywallCost: e.target.value })

  togglePaywall = e => {
    const active = e.target.checked
    this.setState({
      isPaywallActive: active,
      paywallCost: active ? 0.05 : 0
    })
  }

  closeAndUpdate = () => {
    this.props.setPostSettings(this.state)
    this.props.closeModal()
  }

  onCategorySelectChange = (event) => {
    const categoryObject = this.state.categories.find(c => c.value === event.value)
    const categoryDisplayName = categoryObject ? categoryObject.label : null

    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      categoryName: event.value,
      categoryDisplayName: categoryDisplayName,
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

  publishPost = (event) => {
    event.preventDefault();

    this.props.closeModal()

    const { title, editorState, teaser, paywallCost } = this.state
    const body = stateToHTML(editorState.getCurrentContent())
    if (title && body) {
      const data = {
        title: title,
        teaser: teaser,
        body: body,
        paywallCost: paywallCost,
        categoryName: this.state.categoryName,
        isDraft: false,
        tags: this.state.selectedTags || [],
      };

      API.updatePost(this.state.postId, data)
        .then(result => this.props.history.push(`/posts/${result.data._id}`))
        .catch(err => console.log('publishPost Err: ', err))
    };
  };

  render() {
    const postLength = this.state.editorState.getCurrentContent().getPlainText().length
    const readyToPublish = !!this.state.categoryName && this.state.paywallCost >= 0 &&
      this.state.title && postLength > 144

      const customStyles = {
        control: (base) => ({
          ...base,
          background: "#39393A",
        })
      };
    
    return (
      <PublishPostModal
        {...this.state}
        onTeaserChange={this.onTeaserChange}
        onCategorySelectChange={this.onCategorySelectChange}
        onTagSelectChange={this.onTagSelectChange}
        onPaywallCostChange={this.onPaywallCostChange}
        togglePaywall={this.togglePaywall}
        closeModal={this.closeAndUpdate}
        publishPost={this.publishPost}
        readyToPublish={readyToPublish}
        postLength={postLength}
      />
    )
  }
}

export default PublishPostModalContainer
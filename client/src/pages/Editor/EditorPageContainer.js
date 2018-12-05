import React from 'react'
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import API from '../../utils/API';
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import EditorPage from './EditorPage'

class EditorPageContainer extends React.Component {
  constructor(props) {
    super(props)
    const initialCategoryName = this.props.match.categoryId || ''

    this.state = {
      editorState: EditorState.createEmpty(),
      tags: [],
      teaser: '',
      title: '',
      categories: [],
      categoryName: initialCategoryName,
      categoryDisplayName: '',
      selectedCategoryName: '',
      selectedTags: [],
      selectedTagObjects: null,
      postId: null,
      author: props.authUser.dbUser._id,
      paywallCost: '',
    }
  }

  onEditorChange = editorState => this.setState({ editorState })
  onTitleChange = e => this.setState({ title: e.target.value })
  onTeaserChange = e => this.setState({ teaser: e.target.value })

  setPostSettings = pubModalState => this.setState({ ...pubModalState })

  componentDidMount() {
    const isNewPost = !this.props.match.params.postId ? true : false
    const categoryData = this.getCategoryMenuData();
    const postData = isNewPost ? this.initialSave() : this.loadPost()

    Promise.all([categoryData, postData])
      .then(([categoryData, postData]) => {
        let categoryDisplayName = postData.categoryName ? categoryData.find(c => c.value === postData.categoryName).value : ''
        let tags = postData.categoryName ? categoryData.find(c => c.value === postData.categoryName).tags : []
        let selectedOptions = (postData.tags < 1) ? [] : postData.tags.map(t => {
          return { value: t, label: t, color: 'darkcyan' }
        })

        this.setState({
          categories: categoryData,
          selectedTags: postData.tags,
          editorState: this.createFromHtml(postData.body),
          title: postData.title,
          teaser: postData.teaser || '',
          isDraft: postData.isDraft,
          paywallCost: postData.paywallCost, // TODO: react doesn't like this setting for some reason
          postId: postData._id,
          categoryName: postData.categoryName,
          categoryDisplayName,
          tags,
          selectedOptions,
        })
      })
      .catch(err => console.log('componentDidMount getData Error:', err))
  }

  createFromHtml = html => {
    const blocksFromHtml = convertFromHTML(html)
    const state = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks,
      blocksFromHtml.entityMap
    )
    return EditorState.createWithContent(state)
  }

  initialSave = () => {
    const data = {
      title: `Untitled ${new Date().toDateString()}`,
      body: 'And so it begins...',
      isDraft: true
    }
    return API.createPost(data)
      .then(result => result.data)
      .catch(err => console.log(err))
  };

  loadPost() {
    return API.getPost(this.props.match.params.postId)
      .then(result => result.data)
      .catch(err => {
        console.log('Error Loading Post Data:', err)
      })
  }

  getCategoryMenuData = () => {
    return API.getCategoriesTags()
      .then((result) => {
        return result.data.map(category => {
          return {
            value: category.name,
            label: category.displayName,
            tags: category.tags.sort().map(tag => {
              return {
                value: tag,
                label: tag,
                color: "darkcyan"
              }
            })
          }
        })
      }).catch(error => {
        console.log('Error getting Category Data', error);
      });
  };

  saveDraft = (event) => {
    event.preventDefault();
    const { title, selectedTags, teaser, editorState } = this.state
    const body = stateToHTML(editorState.getCurrentContent())

    const data = {
      title: title,
      teaser: teaser,
      body: body,
      tags: selectedTags,
      categoryName: this.state.categoryName,
      isDraft: true,
    };
    API.submitDraft(this.state.postId, data)
      .then(res => console.log('saveDraft response: ', res))
      .catch(err => console.log('saveDraft Err: ', err))
  };

  publishPost = (event) => {
    event.preventDefault();

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
    const readyToPublish = !!this.state.categoryName

    return (
      <EditorPage
        onEditorChange={this.onEditorChange}
        onTitleChange={this.onTitleChange}
        onTeaserChange={this.onTeaserChange}
        onCategorySelectChange={this.categorySelectChange}
        onTagSelectChange={this.onTagSelectChange}
        setPostSettings={this.setPostSettings}
        saveDraft={this.saveDraft}
        publishPost={this.publishPost}
        readyToPublish={readyToPublish}
        {...this.state}
      />
    )
  }
}

const authCondition = authUser => !!authUser

export default withAuthorization(authCondition)(EditorPageContainer)
import React from 'react'
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import API from '../../utils/API';
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import EditorPage from './EditorPage'

class EditorPageContainer extends React.Component {
  constructor(props) {
    super(props)
    const initialCategoryName = this.props.match.params.categoryName || ''

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
      paywallCost: 0.00,
      isPaywallActive: false,
      savePending: false
    }
  }

  onEditorChange = editorState => this.setState({ editorState })
  onTitleChange = e => this.setState({ title: e.target.value })
  onTeaserChange = e => this.setState({ teaser: e.target.value })

  setPostSettings = pubModalState => this.setState({ ...pubModalState })

  componentDidMount() {
    const isNewPost = !this.props.match.params.postId
    const categoryData = this.getCategoryMenuData();
    const postData = isNewPost ? null : this.loadPost()

    Promise.all([categoryData, postData])
      .then(([categoryData, postData]) => {
        let categoryName = postData ? postData.categoryName : this.props.match.params.categoryName
        let categoryDisplayName = categoryName ? categoryData.find(c => c.value === categoryName).value : ''
        let tags = categoryName ? categoryData.find(c => c.value === categoryName).tags : []

        let selectedTagObjects = (!postData || postData.tags < 1) ? [] : postData.tags.map(t => {
          return { value: t, label: t, color: 'darkcyan' }
        })

        let paywallCost = postData ? postData.paywallCost || 0.00 : 0.00
        let isPaywallActive = paywallCost > 0
        let postBody = postData ? postData.body : ''

        this.setState({
          categories: categoryData,
          selectedTags: postData ? postData.tags : [],
          editorState: postBody ? this.createFromHtml(postBody) : EditorState.createEmpty(),
          title: postData ? postData.title : '',
          teaser: postData ? postData.teaser || '' : '',
          isDraft: postData ? postData.isDraft : true,
          postId: postData ? postData._id : '',
          categoryName,
          categoryDisplayName,
          tags,
          selectedTagObjects,
          paywallCost,
          isPaywallActive,
        })
      })
      .catch(err => console.log('componentDidMount getData Error:', err))
  }

  createFromHtml = html => {
    const blocksFromHtml = convertFromHTML(html)

    if (!blocksFromHtml.contentBlocks) {
      return EditorState.createEmpty()
    }

    const state = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks,
      blocksFromHtml.entityMap
    )
    return EditorState.createWithContent(state)
  }

  loadPost() {
    return API.getPost(this.props.match.params.postId)
      .then(result => result.data)
      .catch(err => {
        console.log('Error Loading Post Data:', err)
      })
  }

  // TODO: Clean this up.  Maybe generate the select obj on the fly or
  // at least closer to where it is actually used.
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
    this.setState({ savePending: true })

    const data = {
      title: title,
      teaser: teaser,
      body: body,
      tags: selectedTags,
      categoryName: this.state.categoryName,
      isDraft: true,
    };

    if (this.state.postId) {
      return API.submitDraft(this.state.postId, data)
        .then(res => this.setState({ savePending: false }))
        .catch(err => console.log('saveDraft Err: ', err))
    } else {
      return API.createPost(data)
        .then(res => {
          this.setState({ postId: res.data._id, savePending: false })
        })
    }
  };

  render() {
    return (
      <EditorPage
        onEditorChange={this.onEditorChange}
        onTitleChange={this.onTitleChange}
        onTeaserChange={this.onTeaserChange}
        onCategorySelectChange={this.categorySelectChange}
        onTagSelectChange={this.onTagSelectChange}
        setPostSettings={this.setPostSettings}
        saveDraft={this.saveDraft}
        history={this.props.history}
        {...this.state}
      />
    )
  }
}

const authCondition = authUser => !!authUser

export default withAuthorization(authCondition)(EditorPageContainer)
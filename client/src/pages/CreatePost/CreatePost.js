import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import './createPost.css';
/*import { Input, TextArea, FormBtn } from "../../components/PostComponents/PostForm";*/
import API from '../../utils/API';
import RichTextEditor from 'react-rte';

// Tag Multiselect
import Select from 'react-select';
import chroma from 'chroma-js';
import makeAnimated from 'react-select/lib/animated';

// React Select docs: https://react-select.com/home

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

export class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.dropdownChange = this.dropdownChange.bind(this);

    this.state = {
      tags: [],
      teaser: "",
      title: "",
      categories: [],
      categoryTags: [],
      dropdownOpen: false,
      redirectToNewPage: false,
      redirectPathId: "",
      value: RichTextEditor.createEmptyValue(),
      selectedOption: null,
      categoryName: props.match.params.categoryName,
      savedDraftID: "",
      author: props.authUser.dbUser._id
    };

    //this.categoryName = props.match.params.categoryName
  }

  componentDidMount() {
    this.setState({ categoryName: this.props.match.params.categoryName });
    this.getCategories();
    this.initialSave();
    console.log(this.state)
  }
  initialSave = () => {
    const { tags, value } = this.state
    const body = value.toString('html')
      const data = {
        title: "untitled",
        // teaser: teaser,
        body: body,
        tags: tags,
        categoryName: this.state.categoryName,
        isDraft: true
      }
    API.createInitialPost(data)
    .then(res => this.setState({ savedDraftID: res.data._id }))
    .catch(err => console.log(err))
  };

  getCategories = () => {
    API.getCategoriesTags()
      .then((result) => {
        const cData = result.data;
        let categoriesFromApi = cData.map(category => { return { value: category.name, label: category.displayName, tags: category.tags.sort().map(tag => { return { value: tag, label: tag, color: "darkcyan" } }) } })
        this.setState({ categories: (categoriesFromApi) });
      }).catch(error => {
        console.log(error);
      });
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  onEditorChange = (value) => this.setState({ value })

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  dropdownChange(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      categoryName: event.value,
      tags: event.tags,
      selectedOption: null,
      categoryTags: null,
    })
    console.log(this.state);
  };

  handleTagChange = (selectedOption) => {
    this.setState({
      selectedOption,
      categoryTags: selectedOption.map(tag => tag.value)
    });
    console.log(`Option selected:`, selectedOption);
  };

  handleFormSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();

    const { title, value } = this.state
    const body = value.toString('html')
    if (title && body) {
      const data = {
        title: title,
        // teaser: teaser,
        body: body,
        tags: this.state.categoryTags,
        categoryName: this.state.categoryName,
        isDraft: false
      };

      API.createPost(data)
        .then(result => {
          console.log('createPost result: ', result)
          this.setState({ redirectToNewPage: true, redirectPathId: result.data._id })
        }).catch(err => console.log(err))

    };
  };
  //Saving a draft
  saveDraft = (event) => {
    event.preventDefault();
    console.log(this.state.savedDraftID)
    const { title, tags, value } = this.state
    const body = value.toString('html')
    
    const data = {
      title: title,
      // teaser: teaser,
      body: body,
      tags: tags,
      isDraft: true,
    };
    API.submitDraft(this.state.savedDraftID, data)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  };

  render() {
    const { selectedOption } = this.state;

    if (this.state.redirectToNewPage) {
      return (
        <Redirect to={{ pathname: '/posts/' + this.state.redirectPathId }} />
      );
    };

    return (
      <div className="pagebody">
        <React.Fragment>
          <div className="row createForm">
            <div className="col-md-1">

            </div>

            <div className="col-md-8 formBody rounded" >
              <form style={{ margin: '30px 0' }} onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                  <h2 className='postHeader'>CREATE POST</h2>
                  <Select className="categorySelect"
                    onChange={this.dropdownChange}
                    // defaultValue= {this.state.defaultCategory}
                    options={this.state.categories}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 5,
                    })}
                  />

                </div>
                <div className='form-group'>
                  <input className='form-control' type='text' onChange={this.handleInputChange} placeholder='Title' name='title' />
                </div>
                <RichTextEditor
                  value={this.state.value}
                  onChange={this.onEditorChange}
                />
                <br></br>
                <Select
                  id="tagField"
                  className='react-select-container'
                  classNamePrefix="rounded "
                  value={selectedOption}
                  onChange={this.handleTagChange}
                  options={this.state.tags}
                  isMulti
                  isClearable={true}
                  placeholder="Tags"
                  closeMenuOnSelect={false}
                  components={makeAnimated()}
                  styles={colourStyles}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                  })}
                />
                <br></br>
                <input className='btn btn-outline-info createBtn' style={{ margin: '20px 0' }} type='submit' />
                <span><button onClick={this.saveDraft} className="btn fas fa-save floatRight">
                    Save Draft <i className="fas fa-save"></i></button></span> 
              </form>

            </div>
            <div className="col-md-3">
              <div className='guidelineWrapper rounded'>
                  <img className="img-fluid" src="/images/guidelines.png" alt="Listoka Guidelines"></img>
                    <h6 className='guidelineHeader'>Posting Guidelines</h6>
                    <hr></hr>
                    <ul>
                      <li>Guideline 1</li>
                      <li>Guideline 2</li>
                      <li>Guideline 3</li>
                      <li>Guideline 4</li>
                      <li>Guideline 5</li>
                    </ul>
                  </div>
                </div>
              </div>
        </React.Fragment>
      </div>
    );
  };
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(CreatePost);
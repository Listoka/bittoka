import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import './createPost.css';
/*import { Input, TextArea, FormBtn } from "../../components/PostComponents/PostForm";*/
import API from '../../utils/API';
import RichTextEditor from 'react-rte';
//import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// Tag Multiselect
import Select from 'react-select';
import chroma from 'chroma-js';
import makeAnimated from 'react-select/lib/animated';
import { TagOptions, colourOptions } from '../../components/TagDisplay/TagColor';

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
      categoryName: "",
      categories: [],
      dropdownOpen: false,
      redirectToNewPage: false,
      redirectPathId: "",
      value: RichTextEditor.createEmptyValue(),
      selectedOption: null,
      categoryName: props.match.params.categoryName
    };

    //this.categoryName = props.match.params.categoryName
  }

  componentDidMount() {
    this.setState({ categoryName: this.props.match.params.categoryName });
    this.getCategories();
    // console.log(this.state);
  }

  getCategories = () => {
    API.getCategoriesTags()
    .then((result) => {
      //console.log(result.data);
      const cData = result.data;
      let categoriesFromApi = cData.map(category => { return {value: category.name, label: category.displayName, tags: category.tags} })
      this.setState({ categories: (categoriesFromApi) });
      console.log(this.state);
    }).catch(error => {
      console.log(error);
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onEditorChange = (value) => this.setState({ value })

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log("I did a thing"); // A++ logging, right here
  }

  dropdownChange(event) {
    //console.log("dropdown function");
    console.log (event);
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      categoryName: event.value,
      tags: event.tags
    })
    console.log(this.state);
  }

  handleTagChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  handleFormSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();

    const { title, tags, value } = this.state
    const body = value.toString('html')
    if (title && body) {
      const data = {
        title: title,
        // teaser: teaser,
        body: body,
        tags: tags,
        categoryName: this.state.categoryName
      }

      API.createPost(data)
        .then(result => {
          console.log('createPost result: ', result)
          this.setState({ redirectToNewPage: true, redirectPathId: result.data._id })
        }).catch(err => console.log(err))

    }
  }

  render() {
    const { selectedOption } = this.state;

    if (this.state.redirectToNewPage) {
      return (
        <Redirect to={{ pathname: '/posts/' + this.state.redirectPathId }} />
      )
    };

    return (
      <div className="pagebody">
        <React.Fragment>
          <div className="row createForm">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <form style={{ margin: '30px 0' }} onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                  <p>Create a post in:</p>
                  <Select className = "categorySelect"
                    onChange = {this.dropdownChange}
                    defaultValue={this.state.categoryName}
                    options={this.state.categories}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        text: 'orangered',
                        primary25: 'royalblue',
                        primary: 'black',
                      },
                    })}
                  />

                </div>
                <div className='form-group'>
                  {/* <label htmlFor='title-input'>Title</label> */}
                  <input className='form-control' type='text' onChange={this.handleInputChange} placeholder='Title' name='title' />
                </div>
                <RichTextEditor
                  value={this.state.value}
                  onChange={this.onEditorChange}
                />
                <br></br>
                <Select
                  value={selectedOption}
                  onChange={this.handleTagChange}
                  options={this.state.tags}
                  isMulti
                  placeholder="Tags"
                  closeMenuOnSelect={false}
                  components={makeAnimated()}
                  styles={colourStyles}
                />
                <br></br>
                <input className='btn btn-outline-info createBtn' style={{ margin: '20px 0' }} type='submit' />

              </form>
            </div>
            <div className="col-md-2">
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  };
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(CreatePost);
import React from 'react'
import ModalWrapper from './ModalWrapper';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import colourStyles from './colourStyles';
import { TextArea } from '../Widgets'

class PublishPostModal extends React.Component {
  constructor(props) {
    super(props)
    const initialTeaser = this.props.teaser || ''
    this.state = {
      isValid: false,
      teaser: initialTeaser
    }
  }

  onTeaserChange = e => {
    this.props.onTeaserChange(e)
    this.setState({ teaser: e.target.value })
  }

  render() {
    console.log('PublishPostModal props: ', this.props)
    return (
      <ModalWrapper
        closeModal={this.props.closeModal}
      >
        <br />
        <Select
          className="categorySelect"
          placeholder='Category'
          onChange={this.props.categorySelectChange}
          options={this.props.categories}
          theme={(theme) => ({ ...theme, borderRadius: 5, })}
          value={{
            value: this.props.categoryName,
            label: this.props.categoryDisplayName,
            color: 'darkcyan'
          }}
          isDisabled={!this.props.isDraft}
        />
        <Select
          id="tagField"
          className='react-select-container'
          classNamePrefix="rounded"
          value={this.props.selectedTagObjects}
          onChange={this.props.onTagSelectChange}
          options={this.props.tags}
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
        <p>Information in the teaser section is available to all Listoka visitors.  Use this field to interest readers in your content.</p>
        <TextArea
          placeholder='Teaser'
          onChange={this.onTeaserChange}
          name='teaser'
          value={this.state.teaser}
        />

      </ModalWrapper>
    )
  }
}

export default PublishPostModal
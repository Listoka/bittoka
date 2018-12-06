import React from 'react'
import ModalWrapper from './ModalWrapper';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import colourStyles from './colourStyles';
import { TextArea, Button } from '../Widgets'

class PublishPostModal extends React.Component {
  render() {
    return (
      <ModalWrapper
        closeModal={this.props.closeModal}
      >
        <h2>Publish Post Settings</h2>
        <br />
        <Select
          className="categorySelect"
          placeholder='Category'
          onChange={this.props.onCategorySelectChange}
          options={this.props.categories}
          theme={(theme) => ({ ...theme, borderRadius: 5, })}
          value={{
            value: this.props.categoryName,
            label: this.props.categoryDisplayName,
            color: 'darkcyan'
          }}
          isDisabled={!this.props.isDraft}
        />
        <br />
        <Select
          id='tagField'
          className='react-select-container'
          classNamePrefix='rounded'
          value={this.props.selectedTagObjects}
          onChange={this.props.onTagSelectChange}
          options={this.props.tags}
          isMulti
          isClearable={true}
          placeholder='Tags'
          closeMenuOnSelect={false}
          components={makeAnimated()}
          styles={colourStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
          })}
        />
        <br />
        <div className='mb-3 p-3 bg-grey-lighter'>
          <label htmlFor='paywall-price'>Paywall Price $</label>
          <input
            className='border border-grey rounded ml-2 text-right py-1 px-2'
            onChange={this.props.onPaywallCostChange}
            value={this.props.paywallCost}
            id='paywall-price' type='number' increment='0.01' />
        </div>
        <p>Information in the teaser section is available to all Listoka visitors.  Use this field to interest readers in your content.</p>
        <TextArea
          placeholder='Teaser'
          onChange={this.props.onTeaserChange}
          name='teaser'
          value={this.props.teaser}
        />
        <br />
        <Button onClick={this.props.closeModal} text='Ok'>Ok</Button>
      </ModalWrapper>
    )
  }
}

export default PublishPostModal
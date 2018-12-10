import React from 'react'
import ModalWrapper from './ModalWrapper';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import colourStyles from './colourStyles';
import { TextArea, Button, B } from '../Widgets'

class PublishPostModal extends React.Component {
  render() {
    return (
      <ModalWrapper
        closeModal={this.props.closeModal}
        width={'w-3/5'}
      >
        <div className='font-header text-light-gray text-2xl text-center'>Publish Post Settings</div>
        <hr className="border-brand-green border-2 hrModals mb-3"></hr>
        <div className='mb-2'>
        <Select
          className="z-99 text-sm text-light-gray bg-input-background"
          placeholder='Category'
          onChange={this.props.onCategorySelectChange}
          options={this.props.categories}
          styles={this.props.styles}
          theme={(theme) => ({ ...theme, borderRadius: 5, })}
          value={{
            value: this.props.categoryName,
            label: this.props.categoryDisplayName,
            color: 'darkcyan'
          }}
          isDisabled={!this.props.isDraft}
        />
        </div>
        {!this.props.categoryName &&
          <p className='text-xs text-red text-center my-2'>
            Please select a category for this post.
        </p>}
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
        {/* <hr className="border-brand-green border-2 hrModals mb-3 mt-3"></hr> */}

        <div className='border border-white my-2 text-light-gray bg-darkest-gray text-sm rounded pt-1 h-10 -pt-px pl-2'>
        <div className='pt-px'></div><div className='pt-px'></div><div className='pt-px'></div>
          <label htmlFor='paywall-active-box'>Activate Paywall: 
          <input
            onChange={this.props.togglePaywall}
            id='paywall-active-box'
            type='checkbox'
            checked={this.props.isPaywallActive}
            className='h-4 w-4'
          />
          </label>
        </div>
          {this.props.isPaywallActive &&
            <div className='w-full p-2 mb-2 text-sm rounded bg-darkest-gray text-light-gray border border-white'>
              <label htmlFor='paywall-price'>Paywall Price:  $</label><span className='mr-0'></span>
              <input
                className='bg-darkest-gray border border-brand-green outline-none rounded ml-2 text-right py-1 px-2 w-24 m-0 text-light-gray'
                onChange={this.props.onPaywallCostChange}
                value={this.props.paywallCost}
                id='paywall-price' type='number' step='0.01'/>
            </div>
          }
        
        {this.props.isPaywallActive &&
          <React.Fragment>
            <p className='text-body text-sm text-light-gray mb-2 text-center'>The content you enter here is available for all to see. Entice, deliver, and earn.</p>
            
            <TextArea
              onChange={this.props.onTeaserChange}
              name='teaser'
              value={this.props.teaser}
            />
          </React.Fragment>}
        {/* <Button onClick={this.props.publishPost} text='Publish' disabled={!this.props.readyToPublish}></Button> */}
        <B className='mr-2' onClick={this.props.publishPost} btnType={'secondary'} disabled={!this.props.readyToPublish}>Publish</B> <span className='mr-1'></span>
        <B onClick={this.props.closeModal} btnType={'secondary'}>Cancel</B>
        {/* <Button onClick={this.props.closeModal} text='Cancel'>Ok</Button> */}
        <div className='mt-1'>
          {!this.props.title &&
            <p className='text-xs text-red text-center mt-1'>Your post must have a title in order to publish</p>}
          {!(this.props.postLength > 144) &&
            <p className='text-xs text-red text-center mt-1'>Your post is too short to publish!</p>}
        </div>
      </ModalWrapper>
    )
  }
}

export default PublishPostModal
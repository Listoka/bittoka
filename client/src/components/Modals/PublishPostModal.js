import React from 'react'
import ModalWrapper from './ModalWrapper';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import colourStyles from './colourStyles';
import { TextArea, B } from '../Widgets'

class PublishPostModal extends React.Component {
  render() {
    return (
      <ModalWrapper
        closeModal={this.props.closeModal}
        width={'w-3/5'}
      >
        <div className='font-header text-light-gray text-2xl text-center'>Publish Post Settings</div>
        <hr className="border-brand-green border hrModals mb-5"></hr>
        <div className='mb-5'>
          <p className='mb-2 text-sm text-light-gray text-text-center'>Category:</p>
          <Select
            className="z-100 text-base"
            placeholder='Category'
            onChange={this.props.onCategorySelectChange}
            options={this.props.categories}
            styles={colourStyles}
            theme={(theme) => ({ ...theme, borderRadius: 5 })}
            value={{
              value: this.props.categoryName,
              label: this.props.categoryDisplayName,
              color: '#D8D8D8'
            }}
            isDisabled={!this.props.isDraft}
          />
        </div>
        <div className='mb-2'>
          {!this.props.categoryName &&
            <p className='text-xs text-red text-center my-2'>
              Please select a category for this post.
          </p>}
        </div>
        <div className='mb-5'>
        <p className='mb-2 text-sm text-light-gray text-text-center'>Tags:</p>
          <Select
            id='tagField'
            className='react-select-container'
            classNamePrefix='z-90 text-base'
            value={this.props.selectedTagObjects}
            onChange={this.props.onTagSelectChange}
            options={this.props.tags}
            isMulti={true}
            isClearable={true}
            placeholder='Tags'
            closeMenuOnSelect={false}
            components={makeAnimated()}
            styles={colourStyles}
            theme={(theme) => ({ ...theme, borderRadius: 5 })}
          />
        </div>

        <div className='h-10 text-light-gray text-sm'>
          <label htmlFor='paywall-active-box'>Enable Paywall:</label>
          <input
              onChange={this.props.togglePaywall}
              id='paywall-active-box'
              type='checkbox'
              checked={this.props.isPaywallActive}
              className='h-4 w-4'
            />
          
        </div>
        {this.props.isPaywallActive &&
          <div className='w-full mb-5 text-sm text-light-gray'>
            <label htmlFor='paywall-price'>Paywall Price: $</label><span className='mr-0'></span>
            <input
              className='bg-darkest-gray border border-brand-green outline-none py-1 px-2 w-24 m-0 rounded ml-2 text-right text-light-gray'
              onChange={this.props.onPaywallCostChange}
              value={this.props.paywallCost}
              id='paywall-price' type='number' step='0.01' />
          </div>
        }

        {this.props.isPaywallActive &&
          <React.Fragment>
            <p className='mb-2 text-sm text-light-gray text-text-center'>Teaser:</p>
            <TextArea
              onChange={this.props.onTeaserChange}
              name='teaser'
              value={this.props.teaser}
            />
            <p className='mb-5 mt-1 text-body text-sm text-light-gray text-center'>The content you enter here is available for all to see. Entice, deliver, and earn.</p>
          </React.Fragment>}

        <div className=''>
          {!this.props.title &&
            <p className='text-xs text-red text-center mb-5'>Your post must have a title in order to publish</p>}
          {!(this.props.postLength > 144) &&
            <p className='text-xs text-red text-center mb-2'>Your post is too short to publish!</p>}
        </div>
        {/* <Button onClick={this.props.publishPost} text='Publish' disabled={!this.props.readyToPublish}></Button> */}
        <div className='text-right'>
          <B onClick={this.props.publishPost} btnType={'secondary'} disabled={!this.props.readyToPublish}>Publish</B> 
          <span className='mr-2'></span>
          <B onClick={this.props.closeModal} btnType={'secondary'}>Cancel</B>
          {/* <Button onClick={this.props.closeModal} text='Cancel'>Ok</Button> */}
        </div>

      </ModalWrapper>
    )
  }
}

export default PublishPostModal
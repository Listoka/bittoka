import React from "react";
import { EditIcon, CancelIcon, TextArea, B } from '../../components/Widgets';

const AccountSettings = props => (
  <React.Fragment>
    <div className='w-full bg-darkest-gray p-5 rounded-lg mb-2'>
      <div className='flex'>
        <div className='font-header text-lg mr-1 mb-5'>Bio</div>
        {props.showBio
          ? <EditIcon onClick={props.editBio} styles={'text-brand-green mt-px pt-px'} />
          : null
        }
      </div>

      {props.showBio
        ? <div className='text-sm'>
          {props.bio}
        </div>
        : <form>
          <TextArea
            value={props.bio}
            onChange={props.onChange}
            name="bio"
            placeholder="Enter bio here"
          />
          <B disabled={!(props.bio)} onClick={props.handleFormSubmit} btnType={'secondary'}>Update Bio</B><span className='mr-2' />
          <CancelIcon onClick={props.editBio} styles={'hover:text-brand-green'} text='Cancel' />
        </form>
      }
    </div>
    <div className='w-full bg-darkest-gray p-5 rounded-lg mb-2'>
      {props.showMoneyBtnId
        ? <div className='flex'>
          <div className='font-header text-lg mr-1'>MoneyButton User Number: {props.moneyBtnId}</div>
          <EditIcon
            onClick={props.editmoneyBtnId}
            onChange={props.onChange}
            styles={'text-brand-green mt-px pt-px'}
          />
        </div>
        : <React.Fragment>
          <p className='mb-3 font-header text-lg'>MoneyButton User Number:</p>
          <form>
            <input
              value={props.moneyBtnId}
              onChange={props.onChange}
              name="moneyBtnId"
              className='w-24 outline-none border focus:border-brand-green focus:border-0'
            />
            <div className='-mt-1'>
              <B disabled={!(props.moneyBtnId)} onClick={props.handleMoneyBtnIdSubmit} btnType={'secondary'}>Update</B><span className='mr-2' />
              <CancelIcon onClick={props.editmoneyBtnId} styles={'hover:text-brand-green'} text='Cancel' />
            </div>
          </form>
        </React.Fragment>
      }
    </div>
  </React.Fragment>
);

export default AccountSettings;
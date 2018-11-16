import React from "react";
import { EditIcon, CancelIcon, TextArea, Button, Input } from '../../components/Widgets';

const AccountSettings = props => (
  <React.Fragment>
    Password Reset to be included
    <hr />
    <div className='flex'>
      <h4 className='font-header -mt-px -mr-1'>Bio</h4>
      {props.showBio
        ? <EditIcon onClick={props.editBio} />
        : null
      }
    </div>
    <hr />
    {props.showBio
      ? <div>
        {props.bio}
      </div>
      : <form>
        <TextArea
          value={props.bio}
          onChange={props.onChange}
          name="bio"
          placeholder="Enter bio here"
        />
        <Button
          disabled={!(props.bio)}
          onClick={props.handleFormSubmit}
          text='Update Bio'
        />
        <CancelIcon onClick={props.editBio} text='Cancel' />
      </form>
    }
    <hr />
    {props.showMoneyBtnId
      ? <div className='flex'>
        <h4 className=' font-header -mt-2px -mr-1'>MoneyButton User Number: {props.moneyBtnId}</h4>
        <EditIcon
          onClick={props.editmoneyBtnId}
          onChange={props.onChange}
        />
      </div>
      : <form>
        <Input
          value={props.moneyBtnId}
          onChange={props.onChange}
          name="moneyBtnId"
          styles={{ width: 125 + 'px' }}
        />
        <Button
          disabled={!(props.moneyBtnId)}
          onClick={props.handleMoneyBtnIdSubmit}
          text='Update'
        >
        </Button>
        <CancelIcon onClick={props.editmoneyBtnId} text='Cancel' />
      </form>
    }
    <hr />

  </React.Fragment>
);

export default AccountSettings;
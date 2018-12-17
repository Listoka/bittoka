import React from "react";
import { B } from '../../components/Widgets';
import Sidebar from '../../components/Sidebar/Sidebar';
import AccountViewConductor from './AccountViewConductor';
import { DraftListItem } from '../../components/List/DraftListItem';
import { List } from '../../components/List';

// TODO: Add a comments section to view the comments you have made

const AccountPage = props => {

  const { switchView, drafts, removeDraft, ...conductorProps } = props

  return (
    <div className='absolute w-full mt-5'>
      <div className='container w-full flex mx-auto'>
        <div className='w-2/3 px-1'>
          <div className='mx-0 mb-2 p-4 rounded-lg bg-darkest-gray'>
            <div className='mb-3'>
              <div className='text-3xl font-header'>{props.userName}</div>
            </div>
            <hr className="border-brand-green border hrModals mb-2"></hr>
            <div className='w-full flex'>
              <B btnType={'primary'} onClick={(e) => switchView(e, 'SETTINGS')}>Settings</B><span className='mr-1' />
              <B btnType={'primary'} onClick={(e) => switchView(e, 'POSTS')} >Posts</B><span className='mr-1' />
              <B btnType={'primary'} onClick={(e) => switchView(e, 'TRANSACTIONS')} >Transactions</B>
            </div>
          </div>
          <div className='flex flex-col'>
            <AccountViewConductor {...conductorProps} />
          </div>
        </div>
        <div className='w-1/3 px-1'>
          <Sidebar>
            <div className='mb-3'>
              <div className='font-header text-3xl text-center'>Your drafts</div>
            </div>
            <hr className="border-brand-green border hrModals mb-3"></hr>
            <DraftsList data={drafts} removeDraft={removeDraft} />
          </Sidebar>
        </div>
      </div>
    </div>
  )
};

const DraftsList = props => {
  return <List data={props.data} keyProp='_id' component={DraftListItem} removeDraft={props.removeDraft} />
}

export default AccountPage;
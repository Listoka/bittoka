import React from "react";
import { TransactionsContainer } from '../../components/Transactions';
import { DraftsContainer } from '../../components/Drafts';
import { SettingsContainer } from '../../components/AccountSettings';
import { MainWrapper, Button } from '../../components/Widgets';
import Sidebar from '../../components/Sidebar/Sidebar';
import AccountViewConductor from './AccountViewConductor';
import {DraftListItem} from '../../components/Drafts/DraftListItem';
import List from '../../components/Widgets/List';

const AccountPage = props => (
  
  <div className='p-0 m-0 w-full'>
    <div className='w-full flex mx-0'>
      <MainWrapper styles='w-2/3'>
        <div className='w-full flex mx-0'>
        <Button text={'View Posts'} onClick={(e) => props.switchView(e, 'POSTS')}/> 
          <Button text={'Settings'} onClick={(e) => props.switchView(e, 'SETTINGS')}/>
        </div>
        <AccountViewConductor 
          userPosts={props.userPosts}
          currentView={props.currentView} 
        />
          <TransactionsContainer />
          
          <SettingsContainer />
      </MainWrapper>
      <MainWrapper styles='w-1/3'>
        <Sidebar>
        <h2 className='font-header text-center'>Your drafts</h2>
        <hr className='h-px'/>
          {/* <DraftsContainer id={props.userId}/> */}
          <DraftsList data={props.drafts} removeDraft={this.removeDraft} />
        </Sidebar>
      </MainWrapper>
    </div>
  </div>
);

const DraftsList = props => {
  return <List data={props.data} keyProp='_id' component={DraftListItem} removeDraft={props.removeDraft} />
}

export default AccountPage;
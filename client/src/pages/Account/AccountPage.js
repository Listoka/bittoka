import React from "react";
import { MainWrapper, Button } from '../../components/Widgets';
import Sidebar from '../../components/Sidebar/Sidebar';
import AccountViewConductor from './AccountViewConductor';
import { DraftListItem } from '../../components/Drafts/DraftListItem';
import List from '../../components/Widgets/List';

const AccountPage = props => (
  
  <div className='p-0 m-0 w-full'>
  {console.log(props)}
    <div className='w-full flex mx-0'>
      <MainWrapper styles='w-4/5'>
        <div className='w-full flex mx-0'>
          <Button text={'Settings'} onClick={(e) => props.switchView(e, 'SETTINGS')}/>
          <Button text={'Posts'} onClick={(e) => props.switchView(e, 'POSTS')}/> 
          <Button text={'Transactions'} onClick={(e) => props.switchView(e, 'TRANSACTIONS')}/>
        </div>
        <hr/>
        <AccountViewConductor 
          userPosts={props.userPosts}
          currentView={props.currentView}
          moneyBtnId={props.moneyBtnId}
          bio={props.bio}
          amtEarned={props.amtEarned}
          amtPaid={props.amtPaid}
          editmoneyBtnId={props.editmoneyBtnId}
          editBio={props.editBio}
          showBio={props.showBio}
          showMoneyBtnId={props.showMoneyBtnId}
          onChange={props.onChange}
          handleFormSubmit={props.handleFormSubmit}
          handleMoneyBtnIdSubmit={props.handleMoneyBtnIdSubmit}
        />
      </MainWrapper>
      <MainWrapper styles='w-1/5'>
        <Sidebar>
          <h2 className='font-header text-center'>Your drafts</h2>
          <hr className='h-px'/>
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
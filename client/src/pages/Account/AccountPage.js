import React from "react";
import { MainWrapper, Button } from '../../components/Widgets';
import Sidebar from '../../components/Sidebar/Sidebar';
import AccountViewConductor from './AccountViewConductor';
import { DraftListItem } from '../../components/Drafts/DraftListItem';
import List from '../../components/Widgets/List';

const AccountPage = props => {

  const {switchView, drafts, removeDraft, ...conductorProps } = props
  return (

  <div className='p-0 m-0 w-full frame'>
  {console.log(props)}
    <div className='w-full flex mx-0'>
      <MainWrapper styles='w-4/5'>
        <div className='w-full flex mx-0'>
          <Button text={'Settings'} onClick={(e) => switchView(e, 'SETTINGS')}/>
          <Button text={'Posts'} onClick={(e) => switchView(e, 'POSTS')}/> 
          <Button text={'Transactions'} onClick={(e) => switchView(e, 'TRANSACTIONS')}/>
        </div>
        <hr/>
        <AccountViewConductor {...conductorProps}/>
      </MainWrapper>
      <MainWrapper styles='w-1/5'>
        <Sidebar>
          <h2 className='font-header text-center'>Your drafts</h2>
          <hr className='h-px'/>
            <DraftsList data={drafts} removeDraft={removeDraft} />
        </Sidebar>
      </MainWrapper>
    </div>
  </div>
  )
};

const DraftsList = props => {
  return <List data={props.data} keyProp='_id' component={DraftListItem} removeDraft={props.removeDraft} />
}

export default AccountPage;
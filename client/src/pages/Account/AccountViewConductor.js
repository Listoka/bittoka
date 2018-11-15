import React from 'react';
import { PostListItem } from '../../components/PostComponents/PostListDisplay';
import List from '../../components/Widgets/List';
import { Settings } from '../../components/AccountSettings';
import { Transactions } from '../../components/Transactions';

const AccountViewConductor = props => {
  switch (props.currentView) {
    case 'POSTS':
      return <PostList data={props.userPosts} />;
    case 'SETTINGS':
      return (
        <Settings 
          bio={props.bio} 
          moneyBtnId={props.moneyBtnId} 
          editmoneyBtnId={props.editmoneyBtnId} 
          editBio={props.editBio} 
          showBio={props.showBio}
          onChange={props.onChange}
          handleFormSubmit={props.handleFormSubmit}
          handleMoneyBtnIdSubmit={props.handleMoneyBtnIdSubmit}
          showMoneyBtnId={props.showMoneyBtnId}
        />
      )
    case 'TRANSACTIONS':
      return (
        <Transactions 
          amtEarned={props.amtEarned} 
          amtPaid={props.amtPaid}
        />
      )
    default:
      return null;
  }
};

const PostList = props => {
  return <List data={props.data} keyProp='_id' component={PostListItem} />
}

export default AccountViewConductor;
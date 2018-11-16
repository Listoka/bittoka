import React from 'react';
import { List, PostListItem } from '../../components/List';
import AccountSettings from './AccountSettings';
import { Transactions } from '../../components/Transactions';

const AccountViewConductor = props => {
  switch (props.currentView) {
    case 'POSTS':
      return <PostList data={props.userPosts} />;
    case 'SETTINGS':
      return (
        <AccountSettings
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
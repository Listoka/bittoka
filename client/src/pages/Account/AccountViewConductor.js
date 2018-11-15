import React from 'react';
import { PostListItem } from '../../components/PostComponents/PostListDisplay';
import List from '../../components/Widgets/List';
import { TransactionsContainer } from '../../components/Transactions';
import { SettingsContainer } from '../../components/AccountSettings';

const AccountViewConductor = props => {
  switch (props.currentView) {
    case 'POSTS':
      return <PostList data={props.userPosts} />;
    // case 'SETTINGS':
    //   return <TransactionsContainer data={props.userComments} />;
    // case 'TRANSACTIONS':
    //   return <SettingsContainer />;
    default:
      return null;
  };
};
/* */
const PostList = props => {
  return <List data={props.data} keyProp='_id' component={PostListItem} />
}

export default AccountViewConductor;
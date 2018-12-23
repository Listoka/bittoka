import React from 'react';
import AccountSettings from './AccountSettings';
import { Transactions } from '../../components/Transactions';
import TransactionListContainer from '../../components/Transactions/TransactionListContainer';
import PostListContainer from '../../components/PostList/PostListContainer'

const AccountViewConductor = props => {
  switch (props.currentView) {
    case 'POSTS':
      return <PostListContainer userId={props.userId} />;
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
        <React.Fragment>
          <Transactions
            amtEarned={props.amtEarned}
            amtPaid={props.amtPaid}
          />
          <TransactionListContainer
            userId={props.userId}
          />
        </React.Fragment>
      )
    default:
      return null;
  }
};

export default AccountViewConductor;
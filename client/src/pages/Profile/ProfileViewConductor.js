import React from 'react';
import PostListContainer from '../../components/PostList/PostListContainer'
import { List, CommentListItem } from '../../components/List';

export const ProfileViewConductor = props => {
  switch (props.currentView) {
    case 'POSTS':
      return <PostListContainer userId={props.userId} />
    case 'COMMENTS':
      return <CommentList data={props.userComments} />;
    default:
      return null;
  }
}

const CommentList = props => {
  return <List data={props.data} keyProp='_id' component={CommentListItem} />
}
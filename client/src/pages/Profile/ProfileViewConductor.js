import React from 'react';
import { List, PostListItem, CommentListItem } from '../../components/List';

export const ProfileViewConductor = props => {
  switch (props.currentView) {
    case 'POSTS':
      return <PostList data={props.userPosts} />;
    case 'COMMENTS':
      return <CommentList data={props.userComments} />;
    default:
      return null;
  }
}

const PostList = props => {
  return <List data={props.data} keyProp='_id' component={PostListItem} />
}

const CommentList = props => {
  return <List data={props.data} keyProp='_id' component={CommentListItem} />
}
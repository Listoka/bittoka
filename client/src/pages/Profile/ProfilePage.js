import React from "react";
import { MainWrapper, Button } from '../../components/Widgets/index';
import List from '../../components/Widgets/List';
import Sidebar from '../../components/Sidebar/Sidebar';
import SBTagFilter from '../../components/Sidebar/SBTagFilter';
import { PostListItem, CommentListItem } from '../../components/PostComponents/PostListDisplay';

export const ProfilePage = props => (
  
  <div className='absolute w-full'>
  {console.log(props)}
    <div className='w-full flex mx-0'>
      <MainWrapper styles='w-2/3'>
      <Button text={'View Posts'} onClick={props.switchView}/> <Button text={'View Comments'} onClick={props.switchView} />
      <hr/>
      <div>
        {/* Toggling either the postlist or the commentlist */}
        {props.toggleView
        ?<PostList data={props.userPosts} />
        :<CommentList data={props.userComments} />
        }
      </div>
      </MainWrapper>
      <MainWrapper styles='w-1/3'>
        
      </MainWrapper>
    </div>
  </div>

);

const PostList = props => {
  return <List data={props.data} keyProp='_id' component={PostListItem} />
}

const CommentList = props => {
  return <List data={props.data} keyProp='_id' component={CommentListItem} />
}

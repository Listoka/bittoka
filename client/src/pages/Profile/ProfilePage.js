import React from "react";
import { MainWrapper, Button } from '../../components/Widgets/index';
import List from '../../components/Widgets/List';
import Sidebar from '../../components/Sidebar/Sidebar';
import SBTagFilter from '../../components/Sidebar/SBTagFilter';
import { ProfileViewConductor } from './';

export const ProfilePage = props => (

  <div className='absolute w-full'>
  {console.log(props)}
    <div className='w-full flex mx-0'>
      <MainWrapper styles='w-2/3'>
      <Button text={'View Posts'} onClick={(e) => props.switchView(e, 'POSTS')}/> 
      <Button text={'View Comments'} onClick={(e) => props.switchView(e, 'COMMENTS')}/>
      <hr/>
      <div>
        <ProfileViewConductor 
          userPosts={props.userPosts} 
          userComments={props.userComments} 
          currentView={props.currentView} 
        />
      </div>
      </MainWrapper>
      <MainWrapper styles='w-1/3'>
        
      </MainWrapper>
    </div>
  </div>

);

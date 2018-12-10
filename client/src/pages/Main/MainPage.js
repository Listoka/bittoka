import React from 'react';
import { Link } from 'react-router-dom';
import { List, PostListItem } from '../../components/List';
import { MainWrapper, Button } from '../../components/Widgets/index';
import Sidebar from '../../components/Sidebar/Sidebar';
import AuthUserContext from '../../components/AuthUserSession/AuthUserContext';
import SBTagFilter from '../../components/Sidebar/SBTagFilter';
import IntroHeader from '../../components/IntroHeader';

const MainPage = props => (

  <div className='absolute w-full mt-10px'>

    <div className='container w-full mb-20px'>
      <div className='flex'>
        <MainWrapper styles='w-full'>

          <IntroHeader />

          <div>
            <AuthUserContext.Consumer>
              {authUser => authUser ?
                <Link to={{ pathname: `/editor` }}>
                  <Button className='btn btn-primary btn-primary:hover btn-primary:active outline-none' text='Create Post' />
                </Link> : null}
            </AuthUserContext.Consumer>
          </div>

        </MainWrapper>
      </div>
    </div>

    <div className='container w-full block sm:block md:block lg:flex xl:flex mx-auto '>

      <MainWrapper styles='block sm:block md:block lg:w-4/5 xl:w-4/5'>
        <div className='mb-20px rounded-8px'>
          {/* conditionally render the category display  */}
          {props.categoryDisplayName &&
            <div className='bg-white border-grey rounded m-1 p-3'>
              <h3>{props.categoryDisplayName}</h3>
              <p className='text-sm'>{props.categoryDescription}</p>
            </div>}
          <PostList data={props.filteredPosts} />
        </div>
      </MainWrapper>

      <MainWrapper styles='block sm:block md:block lg:w-1/5 xl:w-1/5'>
        {/* right column container, sidebar */}
        <div className='w-1/5 w-full'>
          <Sidebar>
            <SBTagFilter
              toggleSelectTag={props.toggleSelectTag}
              tags={props.categoryTags}
            />
          </Sidebar>
        </div>
      </MainWrapper>
    </div>
  </div>
)
/* 
  // introduction header goes here...
  <div className='w-full'>

    <IntroHeader />

    <div>
      <AuthUserContext.Consumer>
        {authUser => authUser ?
          <Link to={{ pathname: `/editor` }}>
            <Button text='Create Post' />
          </Link> : null}
      </AuthUserContext.Consumer>
    </div>

    <div className='w-full flex mx-0'>
      
      <div className='w-4/5'>
        
        {props.categoryDisplayName &&
          <div className='bg-white border-grey rounded m-1 p-3'>
            <h3>{props.categoryDisplayName}</h3>
            <p className='text-sm'>{props.categoryDescription}</p>
          </div>}

        <PostList data={props.filteredPosts} />
      </div>

      
      <div className='w-1/5'>
        <Sidebar>
          <SBTagFilter
            toggleSelectTag={props.toggleSelectTag}
            tags={props.categoryTags}
          />
        </Sidebar>
      </div>
    </div>
  </div>
)*/

const PostList = props => {
  return <List data={props.data} keyProp='_id' component={PostListItem} />
}

export default MainPage
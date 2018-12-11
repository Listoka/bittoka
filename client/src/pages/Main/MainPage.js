import React from 'react';
import { Link } from 'react-router-dom';
import { List, PostListItem } from '../../components/List';
import { MainWrapper, B } from '../../components/Widgets/index';
import Sidebar from '../../components/Sidebar/Sidebar';
import AuthUserContext from '../../components/AuthUserSession/AuthUserContext';
import SBTagFilter from '../../components/Sidebar/SBTagFilter';
import IntroHeader from '../../components/IntroHeader';

const MainPage = props => (

  <div className='absolute w-full'>

    <div className='container w-full'>
      <div className='flex'>
        <MainWrapper styles='w-full'>
          <IntroHeader />
        </MainWrapper>
      </div>
    </div>

    <div className='container w-full block sm:block md:block lg:flex xl:flex mx-auto '>

      <MainWrapper styles='block sm:block md:block lg:w-4/5 xl:w-4/5'>
        <div className='mb-5 rounded-lg'>
          {/* conditionally render the category display  */}
          {props.categoryDisplayName &&
            <React.Fragment>
            <div className='bg-darkest-gray rounded mb-5 p-5'>
              <div className='mb-2 text-header text-3xl'>{props.categoryDisplayName}</div>
              <hr className="border-brand-green border hrModals"></hr>
              <p className='leading-normal mb-2'>{props.categoryDescription}</p>
              <div>
                <AuthUserContext.Consumer>
                  {authUser => authUser ?
                    <Link to={{ pathname: `/editor` }}>
                      <B btnType={'secondary'} >Create Post</B>
                    </Link> : null}
                </AuthUserContext.Consumer>
              </div>
            </div>
            
            </React.Fragment>
          }
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
  <React.Fragment>
  <div className='w-full'>
    <IntroHeader />

 
    <div className='w-full'>
    {props.categoryDisplayName &&
          <div className='bg-darkest-gray rounded px-3 pt-2 pb-3 mb-3 mx-3'>
            <div className='text-2xl text-light-gray clearfix'>{props.categoryDisplayName}
              <span className='float-right -mt-2'>
                <AuthUserContext.Consumer>
                  {authUser => authUser ?
                    <Link to={{ pathname: `/editor` }}>
                      <B btnType={'primary'} >Create Post</B>
                    </Link> : null}
                </AuthUserContext.Consumer>
              </span>
            </div>
            
            <hr className="border-brand-green border hrModals"></hr>
            <p className='text-sm'>{props.categoryDescription}</p>
          </div>}
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
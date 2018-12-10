import React from 'react';
import { Link } from 'react-router-dom';
import { List, PostListItem } from '../../components/List';
import { B } from '../../components/Widgets/Button';
import Sidebar from '../../components/Sidebar/Sidebar';
import AuthUserContext from '../../components/AuthUserSession/AuthUserContext';
import SBTagFilter from '../../components/Sidebar/SBTagFilter';
import IntroHeader from '../../components/IntroHeader';

const MainPage = props => (
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
  </div>
    <div className='w-full flex'>
      {/* left column container, main content */}
      <div className='w-4/5 mx-3'>
        {/* conditionally render the category display  */}
        

        <PostList data={props.filteredPosts} />
      </div>

      {/* right column container, sidebar */}
      <div className='w-1/5 mr-3'>
        <Sidebar>
          <SBTagFilter
            toggleSelectTag={props.toggleSelectTag}
            tags={props.categoryTags}
          />
        </Sidebar>
      </div>
      </div>
  </React.Fragment>
)

const PostList = props => {
  return <List data={props.data} keyProp='_id' component={PostListItem} />
}

export default MainPage
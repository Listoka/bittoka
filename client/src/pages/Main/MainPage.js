import React from 'react'
import { Link } from 'react-router-dom'
import { List, PostListItem } from '../../components/List';
import { Button } from '../../components/Widgets/Button'
import Sidebar from '../../components/Sidebar/Sidebar'
import AuthUserContext from '../../components/AuthUserSession/AuthUserContext'
import SBTagFilter from '../../components/Sidebar/SBTagFilter';
import IntroHeader from '../../components/IntroHeader'

const MainPage = props => (
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
      {/* left column container, main content */}
      <div className='w-4/5'>
        {/* conditionally render the category display  */}
        {props.categoryDisplayName &&
          <div className='bg-white border-grey rounded m-1 p-3'>
            <h3>{props.categoryDisplayName}</h3>
            <p className='text-sm'>{props.categoryDescription}</p>
          </div>}

        <PostList data={props.filteredPosts} />
      </div>

      {/* right column container, sidebar */}
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
)

const PostList = props => {
  return <List data={props.data} keyProp='_id' component={PostListItem} />
}

export default MainPage
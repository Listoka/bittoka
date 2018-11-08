import React from 'react'
import List from '../../components/Widgets/List';
import { PostListItem } from '../../components/PostComponents/PostListDisplay';

const MainPage = props => (
  // introduction header goes here...
  <div className='w-full flex'>
    <div className='w-4/5 p-1'>

     {/* conditionally render the category display  */}
      {props.categoryDisplayName &&
        <div className='bg-white border-grey rounded m-1 p-3'>
          <h3>{props.categoryDisplayName}</h3>
          <p className='text-sm'>{props.categoryDescription}</p>
        </div>}

      <PostList data={props.posts} />
    </div>

    <div className='w-1/5'>
      <Sidebar>
        {/* <SBCategoryDescription
          categoryDisplayName={props.categoryDisplayName}
          categoryDescription={props.categoryDescription}
         /> */}
      </Sidebar>
    </div>
  </div>
)

const PostList = props => {
  return <List data={props.data} keyProp='_id' component={PostListItem} />
}

const Sidebar = props => {
  return (
    <div>
      {props.children}
    </div>
  )
}

const SidebarSection = props => {
  // types header, body, footer
  const headerClasses = 'bg-white border-grey rounded-t p-1 mb-0'
  const bodyClasses = 'bg-white border-grey border-t-0 p-1 my-0'
  const footerClasses = 'bg-white border-grey border-t-0 rounded-b p-1 mt-0'

  let classes = ''
  if (props.type === 'header') {
    classes = headerClasses
  }

  if (props.type === 'body') {
    classes = bodyClasses
  }

  if (props.type === 'footer') {
    classes = footerClasses
  }

  return (
    <div className={classes}>
      {props.children}
    </div>
  )
}

const SBCategoryDescription = props => {
  return (
    <SidebarSection type='header'>
      <React.Fragment>
      </React.Fragment>
    </SidebarSection>
  )
}

export default MainPage
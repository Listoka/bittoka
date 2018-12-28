import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import SBTagFilter from '../Sidebar/SBTagFilter';
import { List, PostListItem } from '../List'
import { B, Card } from '../Widgets/index';
import loader from '../../assets/images/loading.svg'

const PostListDisplay = props => {
  let divClassName = 'mb-5 rounded-lg mr-1'
  divClassName = props.categoryName
    ? divClassName + ' w-4/5'
    : divClassName + ' w-full'

  return (
    <div className='container w-full'>
      <div className='max-w-lg flex mx-auto'>
        <div className={divClassName}>
          {props.isLoading
            ? <PostListLoading />
            : <React.Fragment>
              <PostList data={props.filteredPosts} />
              <div>
                {props.noMoreResults
                  ? <p>Sorry, no more result to get! Try adjusting your filters up top.</p>
                  : <B btnType='primary' onClick={() => props.fetchMorePosts()}>More</B>}
              </div>
            </React.Fragment>
          }
        </div>
        {props.categoryName &&
          <div className='w-1/5 ml-1'>
            <Sidebar>
              <SBTagFilter
                toggleSelectTag={props.toggleSelectTag}
                tags={props.categoryTags}
                selectedTags={props.selectedTags}
              />
            </Sidebar>
          </div>}
      </div>
    </div>
  )
}

const PostList = props => {
  return <List data={props.data} keyProp='_id' component={PostListItem} />
}

const PostListLoading = props => {
  const a = []
  for (let i = 0; i < 5; i++) {
    a[i] = <Card key={i}><img src={loader} className='mx-auto my-16' /></Card>
  }
  return a
}

export default PostListDisplay
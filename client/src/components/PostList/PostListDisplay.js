import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import SBTagFilter from '../Sidebar/SBTagFilter';
import { List, PostListItem } from '../List'
import { B } from '../Widgets/index';

const PostListDisplay = props => {
  return (
    <React.Fragment>
      {!props.categoryName ?
        <div className='container w-full'>
          <div className='max-w-lg flex mx-auto'>
            <div className='mb-5 rounded-lg w-full mr-1'>
              <PostList data={props.filteredPosts} />
              <div>
                {props.noMoreResults
                  ? <p>Sorry, no more result to get! Try adjusting your filters up top.</p>
                  : <B btnType='primary' onClick={() => props.fetchMorePosts()}>More</B>}
              </div>
            </div>
          </div>
        </div>
        :
        <div className='container w-full'>
          <div className='max-w-lg flex mx-auto'>
            <div className='mb-5 rounded-lg w-4/5 mr-1'>
              <PostList data={props.filteredPosts} />
              <div>
                {props.noMoreResults
                  ? <p>Sorry, no more result to get! Try adjusting your filters up top.</p>
                  : <B btnType='primary' onClick={() => props.fetchMorePosts()}>More</B>}
              </div>
            </div>
            <div className='w-1/5 ml-1'>
              <Sidebar>
                <SBTagFilter
                  toggleSelectTag={props.toggleSelectTag}
                  tags={props.categoryTags}
                  selectedTags={props.selectedTags}
                />
              </Sidebar>
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  )
}

const PostList = props => {
  return <List data={props.data} keyProp='_id' component={PostListItem} />
}

export default PostListDisplay
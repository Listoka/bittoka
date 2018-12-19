import React from 'react';
import Moment from 'react-moment';
import { EditButton, DeleteIcon, } from '../Widgets';
import CategoryFlair from '../Widgets/CategoryFlair';

export const DraftListItem = props => {
  return (
    <React.Fragment>
      <div className='border-b border-medium-gray mt-2'>
        <p className='mb-1 text-base'>Title: {props.title ? props.title : 'Untitled'}</p>
        <p className='mb-3 text-xs hidden xs:hidden sm:hidden md:hidden lg:hidden xl:block'>Updated: <Moment fromNow>{props.updatedAt}</Moment> in <span></span>
           <CategoryFlair categoryName={props.categoryName} />
        </p>
        <div className='mb-2'>
          <span className="">
            <span className='mr-2'>
              <EditButton styles={'hover:text-brand-green'} text='Edit Post' authorId={props.author} postId={props.id} />
            </span>
            <span className='ml-2' >
              <DeleteIcon styles={'hover:text-brand-green'} onClick={(event) => props.removeDraft(event, props.id)} text='Delete' />
            </span>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};
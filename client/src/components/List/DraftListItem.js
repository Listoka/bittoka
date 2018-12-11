import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { EditButton, DeleteIcon } from '../Widgets';

export const DraftListItem = props => {
  console.log('DraftListItem props: ', props)
  return (
    <React.Fragment>
      <div className='border-b border-medium-gray mt-2'>
        <p className='mb-1 text-base'>Title: {props.title}</p>
        <p className='mb-3 text-xs'>Updated: <Moment fromNow>{props.updatedAt}</Moment> in
              <Link to={`/categories/${props.categoryName}`}>
            <span className={`${props.categoryName}Flair flair`}> {props.categoryName}</span>
          </Link>
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
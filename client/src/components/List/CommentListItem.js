import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { BitcoinIcon } from '../Widgets';

export const CommentListItem = props => {
  return (
    <React.Fragment>
      <div className='text-base m-10px px-10px py-5px border-l-2 border-solid rounded'>
        <p className='text-sm mb-2'>
          <BitcoinIcon />
          <span>[$x.xx]</span>
          <Link className='mr-1' to={{ pathname: `/users/${props.author}` }}> {props.authorName}</Link>
          <span> commented on TITLE {}</span>
          <Moment className='mr-2' fromNow>{props.createdAt}</Moment>
        </p>
        <p className='text-sm'> {props.body}</p>
      </div>
      <hr />
    </React.Fragment>
  );
};
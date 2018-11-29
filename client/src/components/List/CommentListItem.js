import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { BitcoinIcon } from '../Widgets';

export const CommentListItem = props => {
  return (
    <React.Fragment>
      <div className='mb-20px p-40px rounded-8px bg-darkest-gray'>
        <h4 className='mb-2'>
          <BitcoinIcon />
          <span>[$x.xx]</span>
          <Link className='mr-1' to={{ pathname: `/users/${props.author}` }} style={{color: '#FFF'}}> {props.authorName}</Link>
          <span> commented on TITLE {}</span>
          <Moment className='mr-2' fromNow>{props.createdAt}</Moment>
        </h4>
        <p>{props.body}</p>
      </div>
    </React.Fragment>
  );
};
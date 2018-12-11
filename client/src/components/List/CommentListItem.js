import React from 'react';
import Moment from 'react-moment';
import { BitcoinIcon, CalendarIcon } from '../Widgets';

export const CommentListItem = props => {
  return (
    <React.Fragment>
      <div className='mb-2 p-5 rounded-lg bg-darkest-gray'>
        <div className='text-lg text-header text-bold mr-1'> {props.authorName}
          <span className='text-xs text-medium-gray'><span className='mr-2'></span><BitcoinIcon />
          <span className='mr-1 text-xs'>[$x.xx]</span>
          <CalendarIcon /><Moment fromNow>{props.createdAt}</Moment></span>
        </div>
        <hr className="border-medium-gray border-2 hrModals"></hr>
        <p className='text-xs mt-2'>{props.body}</p>
      </div>
    </React.Fragment>
  );
};
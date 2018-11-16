import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { EditButton, BitcoinIcon, CalendarIcon, DollarIcon, UpArrowIcon, Card } from '../Widgets';
import CategoryFlair from '../Widgets/CategoryFlair';

export const PostListItem = props => {
  return (
    <Card>
      <div className='pt-10px pr-10px pl-15px w-full'>
        <div className='clearfix'>
          <span>
            <p className='inline font-header text-2xl'>
              <Link to={{ pathname: `/posts/${props._id}` }}>{props.title}</Link>
            </p>
            <div className='inline'>
              <ul className='text-grey float-right list-reset'>
                {props.tags.sort().map(tags => (
                  <li key={tags}>#<span className='mr-1'></span>{tags}</li>
                ))}
              </ul>
            </div>
            <p className='text-sm mb-10px text-grey' text={'Posted by'}>
              <Link to={{ pathname: `/users/${props.author}` }}> {props.authorName} </Link>
              in <CategoryFlair categoryName={props.categoryName} />
            </p>
            <p className='mb-10px'>{props.teaser}</p>
          </span>
        </div>

        <div className='clearfix'>
          <p className='inline mr-2'>
            <Link to={{ pathname: `/posts/${props._id}` }}>
              <DollarIcon />{props.comments.length}
            </Link>
          </p>
          <p className='inline mr-2'>
            <UpArrowIcon />{props.voters.length}
          </p>
          <p className='inline mr-2'>
            <BitcoinIcon />$0.75
            </p>
          <p className='inline mr-2'>
            <CalendarIcon /><Moment fromNow>{props.createdAt}</Moment>
          </p>

          <div className="float-right">
            <EditButton authorId={props.author} postId={props._id} text='Edit Post' />
          </div>
        </div>
      </div>
    </Card>
  );
};
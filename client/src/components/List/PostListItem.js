import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { EditButton, BitcoinIcon, CalendarIcon, DollarIcon, UpArrowIcon, Card } from '../Widgets';
import CategoryFlair from '../Widgets/CategoryFlair';

export const PostListItem = props => {
  return (
    <Card>
      <div className='w-full'>
          <span>
            <h2 className='inline'>
              <Link to={{ pathname: `/posts/${props._id}` }} style={{color: '#FFF'}}>{props.title}</Link>
            </h2>
            <div className="float-right">
            <EditButton authorId={props.author} postId={props._id} text='Edit' />
            </div>
            <h5 className='my-10px text-white'>
              Posted by 
              <Link to={{ pathname: `/users/${props.author}` }} style={{color: '#FFF'}}> {props.authorName} </Link>
              in <CategoryFlair categoryName={props.categoryName} />
            </h5>
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
          <hr className='border-light-gray border-1'></hr>
          <div className='inline'>
              <ul className='text-grey float-right list-reset'>
                {props.tags.sort().map(tags => (
                  <li key={tags}>#<span className='mr-1'></span>{tags}</li>
                ))}
              </ul>
            </div>
        </div>
  
    </Card>
  );
};
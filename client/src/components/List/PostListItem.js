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
          <div className="float-right text-lg">
          <EditButton authorId={props.author} postId={props._id} text='Edit' />
          </div>
          <h6 className='mt-10px mb-20px font-normal text-white leading-normal'>
            Posted by 
            <Link to={{ pathname: `/users/${props.author}` }} style={{color: '#FFF'}}> {props.authorName} </Link>
            in <CategoryFlair categoryName={props.categoryName} />
          </h6>
          <p className='mb-20px'>{props.teaser}</p>
        </span>
      </div>

      <div className='w-full'>
        <h6 className='inline mx-5px'>
          <Link to={{ pathname: `/posts/${props._id}` }} style={{color: '#FFF'}}>
            <DollarIcon />{props.comments.length}
          </Link>
        </h6>
        <h6 className='inline mx-5px'>
          <UpArrowIcon />{props.voters.length}
        </h6>
        <h6 className='inline mx-5px'>
          <BitcoinIcon />$0.75
        </h6>
        <h6 className='inline mx-5px'>
          <CalendarIcon /><Moment fromNow>{props.createdAt}</Moment>
        </h6>

        <hr className='border-light-gray border-2'></hr>

        <div className='inline'>
            <ul className='flex list-reset text-grey'>
              {props.tags.sort().map(tags => (
                <li className='mr-20px text-xs' key={tags}>— <span className='mr-px'></span>{tags}</li>
              ))}
            </ul>
          </div>
      </div>
  
    </Card>
  );
};
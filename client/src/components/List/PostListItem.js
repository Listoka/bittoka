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
          <section className='relative'>
          <div className="hidden sm:hidden md:inline lg:inline xl:inline float-right text-lg pl-2">
              <EditButton authorId={props.author} postId={props._id} text='Edit' />
            </div>
            <div className="sm:inline md:hidden lg:hidden xl:hidden float-right text-lg pl-2">
              <EditButton authorId={props.author} postId={props._id} text='' />
            </div>
            <div className='inline font-header text-2xl'>
              <Link to={{ pathname: `/posts/${props._id}` }} className='text-light-gray no-underline hover:text-brand-green'>{props.title}</Link>
            </div>
          </section>
          <h6 className='clearfix mt-2 mb-5 font-normal text-light-gray leading-normal'>
            Posted by 
            <Link to={{ pathname: `/users/${props.author}` }} className='text-brand-green no-underline'> {props.authorName} </Link>
            in <CategoryFlair categoryName={props.categoryName} />
          </h6>
          <p className='mb-5'>{props.teaser}</p>
        </span>
      </div>

      <div className='w-full'>
        <h6 className='inline mx-1 font-normal'>
          <Link to={{ pathname: `/posts/${props._id}` }} className='text-light-gray no-underline'>
            <DollarIcon />{props.comments.length}
          </Link>
        </h6>
        <h6 className='inline mx-1 font-normal'>
          <UpArrowIcon />{props.voters.length}
        </h6>
        <h6 className='inline mx-1 font-normal'>
          <BitcoinIcon />$0.75
        </h6>
        <h6 className='inline mx-1 font-normal'>
          <CalendarIcon /><Moment fromNow>{props.createdAt}</Moment>
        </h6>

        <hr className="border-medium-gray border-2 hrModals mb-2"></hr>

        <div className='inline'>
            <ul className='flex list-reset text-grey'>
              {props.tags.sort().map(tags => (
                <li className='mr-5 text-xs' key={tags}>— <span className='mr-px'></span>{tags}</li>
              ))}
            </ul>
          </div>
      </div>
  
    </Card>
  );
};
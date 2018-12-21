import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { EditButton, BitcoinIcon, CalendarIcon, DollarIcon, UpArrowIcon, Card } from '../Widgets';
import CategoryFlair from '../Widgets/CategoryFlair';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

export const PostListItem = props => {
  const shareUrl = `https://listoka.com/posts/${props._id}`
  // http://localhost:3000/posts/${props._id}
  const title = `${props.title} by ${props.authorName}`

  return (
    <Card>
      <div className='w-full'>
        <span>
          <section className='relative clearfix'>
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
          <div className='mt-2 mb-5 w-full'>
            <h6 className='font-normal text-light-gray leading-normal inline'>
              Posted by
            <Link to={{ pathname: `/users/${props.author}` }} className='text-brand-green no-underline'> {props.authorName} </Link>
              in <CategoryFlair categoryName={props.categoryName} />
            </h6>
            <h6 className='inline mx-1 font-normal'>
              <CalendarIcon /><Moment fromNow>{props.createdAt}</Moment>
            </h6>
          </div>
          <p className='mb-5'>{props.teaser}</p>
        </span>
      </div>

      <div className='w-full'>
        <h6 className='inline mx-1 font-normal'>
          <Link to={{ pathname: `/posts/${props._id}` }} className='text-light-gray no-underline'>
            {/* <DollarIcon />{props.comments.length} */}
            <DollarIcon />{props.numComments}
          </Link>
        </h6>
        <h6 className='inline mx-1 font-normal'>
          {/* <UpArrowIcon />{props.voters.length} */}
          <UpArrowIcon />{props.numVotes}
        </h6>
        <h6 className='inline mx-1 font-normal'>
          <BitcoinIcon />$0.75
        </h6>
        <span className='inline-block align-text-bottom mr-1'>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
          >
            <FacebookIcon
              size={16}
              round={true}
            />
          </FacebookShareButton>
        </span>
        <span className='inline-block align-text-bottom'>
          <TwitterShareButton
            url={shareUrl}
            title={title}
          >
            <TwitterIcon
              size={16}
              round={true}
            />
          </TwitterShareButton>
        </span>

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
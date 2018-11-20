import React from 'react'
import { Link } from 'react-router-dom'
import { UpArrowIcon } from '../../components/Widgets/UpArrowIcon'
import Paywall from './Paywall';
import renderHTML from 'react-render-html';
import UpvoteMoneyButton from '../../components/ListokaMoneyButton/UpvoteMoneyButton';
import CategoryFlair from '../../components/Widgets/CategoryFlair';
import { EditButton } from '../../components/Widgets';

const ContentDetail = props => {
  return (
    <div className='max-w-lg md:w-5/6 mx-auto mt-3 p-2 rounded bg-white'>
      <h2>{props.title}</h2>
      <p className='ml-2 mt-2 mb-3'>
        <span className='mr-1'>By: <Link to={{ pathname: `/users/${props.author}` }}>{props.authorName}</Link></span>
        <span className='mr-1'>in <CategoryFlair categoryName={props.categoryName} /></span>
        <span className='mr-1'><UpArrowIcon /> {props.voters ? props.voters.length : 0}</span>
        {props._id &&
          <span className='float-right'><EditButton postId={props._id} authorId={props.author} /></span>}
      </p>

      <Paywall {...props}>
        <div className='mx-4'>
          {props.body && renderHTML(props.body)}
        </div>
        <UpvoteMoneyButton
          payeeId={props.author}
          afterUpvotePayment={props.afterUpvotePayment}
          postId={props._id}
          voters={props.voters}
        />
      </Paywall>

    </div>
  )
}

export default ContentDetail
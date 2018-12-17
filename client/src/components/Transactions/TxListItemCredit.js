import React from "react";
import Moment from 'react-moment';
import { Link } from 'react-router-dom'

const TxListItemCredit = props => {
  const date = props.transaction.createdAt && props.transaction.createdAt.slice(0, 10);
  let amount = 0;
  let path;
  return(
    <React.Fragment>
    
      {props.transaction.txOutputs.map(output => { 
        if (props.transaction.txType==='comment-vote'){
          //Todo: Not sure how to direct page to the specific comment within the post. For now it reverts to the post
          // path = `/comments/${output.comment}`
        } else if (props.transaction.txType==='purchase'|| props.transaction.txType==='post-vote') {
          path = `/posts/${props.transaction.postId}`
        } 
        console.log(output)
        if (output.paidUser === props.userId) {
          return amount += output.amount
        } return null
        
      })}
    
      <tr className='flex w-full text-brand-green text-xs'>
        <td className='p-1 w-1/4'><Moment format="MM-DD-YYYY">{date}</Moment></td>
        <td className='p-1 w-1/4'>${amount.toFixed(2)}</td>
        <td className='p-1 w-1/4'><Link to={{pathname: path}} className='no-underline cursor-pointer text-brand-green'>{props.transaction.txType}</Link></td>
        <td className='p-1 w-1/4'><Link to={{pathname: `/users/${props.transaction.fromUser._id}`}} className='text-brand-green cursor-pointer no-underline'>{props.transaction.fromUser.username}</Link></td>
      </tr>

  </React.Fragment>
  )
}


export default TxListItemCredit;
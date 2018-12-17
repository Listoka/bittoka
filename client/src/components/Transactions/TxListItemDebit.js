import React from "react";
import Moment from 'react-moment';
import { Link } from 'react-router-dom'

const TxListItemDebit = props => {
  const date = props.transaction.createdAt && props.transaction.createdAt.slice(0, 10);
  let path;
  return (
    <React.Fragment>
      {props.transaction.txOutputs.map(output => {
        if (props.transaction.txType==='comment-vote'){
          //Todo: Not sure how to direct page to the specific comment within the post. For now it reverts to the post
          // path = `/comments/${output.comment}`
        } else if (props.transaction.txType==='purchase'|| props.transaction.txType==='post-vote') {
          path = `/posts/${props.transaction.postId}`
        } 
        {/* Todo: NEED TO ADD this check to the if statement below: output.toUser._id===props.userId) */}
        if (output.isListokaAcct===false) {
          return ( 
            <tr key={output._id}className='flex w-full text-red text-xs'>
              <td className='p-1 w-1/4'><Moment format="MM-DD-YYYY">{date}</Moment></td>
              <td className='p-1 w-1/4 text-red'>${output.amount.toFixed(2)}</td>
              <td className='p-1 w-1/4'><Link to={{pathname: path}} className='no-underline cursor-pointer text-red'>{props.transaction.txType}</Link></td>
              <td className='p-1 w-1/4'>{output.toUser.username}</td>
              {/* Todo: NEED TO ADD ABOVE <Link to={{pathname: `/users/${props.transaction.toUser._id}`}}> */}
            </tr>
          )
        } return null
      })}
    </React.Fragment>
  )
}

export default TxListItemDebit
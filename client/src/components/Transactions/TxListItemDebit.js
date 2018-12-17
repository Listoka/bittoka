import React from "react";
import Moment from 'react-moment';
import { Link } from 'react-router-dom'

const TxListItemDebit = props => {
  const date = props.transaction.createdAt && props.transaction.createdAt.slice(0, 10);
  let path;
  let amount = 0;
  let name = '';

  return (
    <React.Fragment>
      {/* Only includes amounts paid to users, not Listoka accounts */}
      {props.transaction.txOutputs.forEach(output => {
        if (output.isListokaAcct === false && output.toUser._id!==props.userId) {
          amount += output.amount
        }
        
        // This determines if we have multiple names (which includes a collapse function) or just one name
        if (props.transaction.batch === true) {
          name = <span onClick={props.toggleIsCollapsed} 
          className={`cursor-pointer text-medium-gray no-underline`}>[ View ]</span>;
        } else if (props.transaction.batch === false && output.isListokaAcct === false) {
          name = <Link to={{ pathname: `/users/${output.toUser._id}` }}
            className={`no-underline text-red cursor-pointer`}>{output.toUser.username}</Link>
        }

        // This determines what should be done depending on the transaction type.
        if (props.transaction.txType==='purchase'|| props.transaction.txType==='post-vote') {
          path = <Link to={{pathname: `/posts/${props.transaction.postId}`}}
            className={`no-underline cursor-pointer text-light-gray`}>{props.transaction.txType}</Link>
        } else {
          path = props.transaction.txType
        }
      })}

      {/* 1st level of data on the page */}
      <tr key={''} className='flex w-full text-xs'>
        <td className='p-1 w-1/4 text-light-gray'><Moment format="MM-DD-YYYY">{date}</Moment></td>
        <td className='p-1 w-1/4 text-red'>${amount.toFixed(2)}</td>
        <td className='p-1 w-1/4 text-light-gray'>{path}</td>
        <td className={`p-1 w-1/4`}>{name}</td>
      </tr>
      {/* Potentially second level of data on page */}
      {!props.isCollapsed &&
        props.transaction.txOutputs.map(output => {
          if (output.isListokaAcct === false && output.toUser._id !== props.userId) {
            return (
              <TxOutputs
                key={output._id}
                output={output}
                txType={props.transaction.txType}
              />
            )
          }
        })
      }
    </React.Fragment>
  )
}
  
const TxOutputs = props => {
  return (
    <tr className='flex w-full text-xs'>
      <td className='p-1 w-1/4'></td>
      <td className='p-1 w-1/4 text-light-gray italic'>${props.output.amount}</td>
      <td className='p-1 w-1/4'></td>
      <td className='p-1 w-1/4'><Link to={{ pathname: `/users/${props.output.toUser._id}` }} className='no-underline text-red cursor-pointer'>{props.output.toUser.username}</Link></td>
    </tr>
  )
}

export default TxListItemDebit
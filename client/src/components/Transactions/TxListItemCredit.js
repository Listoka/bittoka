import React from "react";
import Moment from 'react-moment';

const TxListItemCredit = props => {
  const date = props.transaction.createdAt && props.transaction.createdAt.slice(0, 10);
  let amount = 0
  
  // props.transaction.txOutputs
  return(
    <React.Fragment>
      {props.transaction.txOutputs.forEach(output => { 
        if (output.userId === props.userId) {
          amount += output.amount
        }})
      }
    <tr className='flex w-full text-brand-green text-xs'>
      <td className='p-1 w-1/4'><Moment format="MM-DD-YYYY">{date}</Moment></td>
      <td className='p-1 w-1/4'>{props.transaction.txType}</td>
      <td className='p-1 w-1/4'>${amount}</td>
      <td className='p-1 w-1/4'>{props.transaction.fromUser.username}</td>
    </tr>

    {/* <div className='text-brand-green text-xs flex justify-between'>
      <div className='inline-flex'>{date}</div>
      <div className='inline-flex'>{amount}</div>
      <div className='inline-flex'>{props.transaction.txType}</div>
      <div className='inline-flex'>{props.transaction.fromUser.username}</div>
    </div> */}
  </React.Fragment>
  )
}
export default TxListItemCredit;
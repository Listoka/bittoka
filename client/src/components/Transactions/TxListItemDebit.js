import React from "react";
import Moment from 'react-moment';

const TxListItemDebit = props => {
  const date = props.transaction.createdAt && props.transaction.createdAt.slice(0, 10);
  let amount = 0
  
  return (
    <React.Fragment>
      {props.transaction.txOutputs.forEach(output => amount += output.amount)} 
      
      <tr className='flex w-full text-red text-xs'>
        <td className='p-1 w-1/4'><Moment format="MM-DD-YYYY">{date}</Moment></td>
        <td className='p-1 w-1/4'>{props.transaction.txType}</td>
        <td className='p-1 w-1/4'>${amount.toFixed(2)}</td>
        <td className='p-1 w-1/4 '>{props.transaction.fromUser.username}</td>
      </tr>
    </React.Fragment>
  )
}

export default TxListItemDebit
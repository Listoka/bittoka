import React from 'react'
import TxListItem from './TxListItem';
import { B } from '../Widgets'

const TransactionList = props => {
  return (
    <React.Fragment>
      {console.log(props)}
      <div className='w-full bg-darkest-gray p-4 rounded-lg'>
        <table className='w-full text-left'>
          <thead className='border-medium-gray border-b-2 hrModals mb-3'>
            <tr className='flex w-full'>
              <th className='p-1 w-1/4 font-normal font-base'>Date</th>
              <th className='p-1 w-1/4 font-normal font-base'>Type</th>
              <th className='p-1 w-1/4 font-normal font-base'>Amount</th>
              <th className='p-1 w-1/4 font-normal font-base'>To/From</th>
            </tr>
          </thead>
        {/* <hr className="border-medium-gray border-2 hrModals mb-3"></hr> */}
          <tbody className='flex flex-col items-center justify-between w-full'>
            {props.transactions.map(transaction =>{
              return (
              <TxListItem 
                transaction={transaction}
                key={transaction._id}
                userId={props.userId}
              />
              )
            })} 
          </tbody>
        </table>
        <B btnType='primary' onClick={props.fetchNextPage}>More</B>
      </div>
    </React.Fragment>
  )
}

export default TransactionList
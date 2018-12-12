import React from "react";


export const Transactions = props => (
  <React.Fragment>
    <div className='w-full bg-darkest-gray p-5 rounded-lg'>
      <p className='mb-2'>Total paid to other users: <span className='text-brand-green'>${props.amtPaid}</span></p>
      <p>Total earned from other users: <span className='text-brand-green'>${props.amtEarned}</span></p>
    </div>
  </React.Fragment>
);
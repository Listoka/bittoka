import React from "react";


export const Transactions = props => (
  <React.Fragment>
    <div className='pt-10px pr-10px pl-2'>
      <p>Total paid to other users to date: ${props.amtPaid}
      <br/>Total earned from other users to date: ${props.amtEarned}</p>
    </div>
  </React.Fragment>
);
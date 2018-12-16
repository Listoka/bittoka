import React from "react";
import TxListItemDebit from './TxListItemDebit'
import TxListItemCredit from './TxListItemCredit'

const TxListItem = props => {
  console.log(props)
  const isDebit = props.transaction.fromUser._id === props.userId // or whatever
  return isDebit ? <TxListItemDebit {...props} /> : <TxListItemCredit {...props} />
  
}

export default TxListItem;
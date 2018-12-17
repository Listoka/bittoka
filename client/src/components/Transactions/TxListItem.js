import React from "react";
import TxListItemDebit from './TxListItemDebit';
import TxListItemCredit from './TxListItemCredit';

class TxListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollapsed: true
    }
  }

  toggleIsCollapsed = () => this.setState({ isCollapsed: !this.state.isCollapsed })

  render() {
    const isDebit = this.props.transaction.fromUser._id === this.props.userId
    
    return (
      isDebit ? <TxListItemDebit {...this.props} toggleIsCollapsed={this.toggleIsCollapsed}/> 
      : <TxListItemCredit {...this.props} toggleIsCollapsed={this.toggleIsCollapsed}/>
    )
  }
}

// const TxListItem = props => {
//   const isDebit = props.transaction.fromUser._id === props.userId // or whatever
//   return isDebit ? <TxListItemDebit {...props} /> : <TxListItemCredit {...props} />
// }

export default TxListItem;
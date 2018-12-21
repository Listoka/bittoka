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
      isDebit ? <TxListItemDebit {...this.props} {...this.state} toggleIsCollapsed={this.toggleIsCollapsed}/> 
      : <TxListItemCredit {...this.props} {...this.state} toggleIsCollapsed={this.toggleIsCollapsed}/>
    )
  }
}

export default TxListItem;
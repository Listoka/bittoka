import React from 'react'
import VoteBasket from './VoteBasket';

class VoteBasketContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollapsed: true
    }
  }

  toggleIsCollapsed = () => this.setState({ isCollapsed: !this.state.isCollapsed })
  submitAndCollapse = () => {
    this.toggleIsCollapsed()
    this.props.submitVotes()
  }

  render() {
    return (
      <VoteBasket
        toggleIsCollapsed={this.toggleIsCollapsed}
        submitAndCollapse={this.submitAndCollapse}
        {...this.props}
        {...this.state}
      />
    )
  }
}

export default VoteBasketContainer
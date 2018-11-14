import React from 'react'
import CommentNode from './CommentNode';

class CommentNodeContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollapsed: false,
      showForm: false
    }
  }

  toggleCollapse = e => {
    e.preventDefault()
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  toggleShowForm = e => {
    e.preventDefault()
    this.setState({ showForm: !this.state.showForm })
  }

  render() {
    return (
      <CommentNode
        {...this.props}
        {...this.state}
        toggleCollapse={this.toggleCollapse}
        toggleShowForm={this.toggleShowForm}
      />
    )
  }
}

export default CommentNodeContainer
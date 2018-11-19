import React from 'react'

class CommentReplyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange = e => this.setState({ value: e.target.value })
  handleSubmit = e => {
    e.preventDefault()
    this.props.toggleShowForm()
    this.props.submitComment({
      parentComment: this.props.parentComment,
      body: this.state.value,
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='bg-grey-lighter'>
        <textarea onChange={this.handleChange} rows='5' className='mx-3 my-1 border-grey border-1'>
        </textarea>
        <input type='submit' />
      </form>
    )
  }
}

export default CommentReplyForm
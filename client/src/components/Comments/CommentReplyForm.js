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
      <form onSubmit={this.handleSubmit} className='flex bg-grey-lighter'>
        <ReplyTextArea onChange={this.handleChange} />
        <input className='bg-blue hover:bg-blue-dark ml-0 mr-1 my-1 text-white cursor-pointer' type='submit' />
      </form>
    )
  }
}

const ReplyTextArea = props => {
  return (
    <textarea
      onChange={props.onChange}
      rows={props.rows || '5'}
      className='w-full border-grey m-1 p-3'
    />
  )
}

export default CommentReplyForm
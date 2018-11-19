import React from 'react'
import AuthUserContext from '../AuthUserSession/AuthUserContext';
// import ModalLaunchContext from '../Modals/ModalLaunchContext';
import TextButton from '../Widgets/TextButton'
import CommentReplyForm from './CommentReplyForm';

class CommentListHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false
    }
  }

  toggleShowForm = () => this.setState({ showForm: !this.state.showForm })

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className='border-grey-lighter border-b mb-2 p-2'>
            {authUser &&
              <TextButton onClick={this.toggleShowForm} text='[ add comment ]' />}
            {this.state.showForm &&
              <CommentReplyForm
                toggleShowForm={this.toggleShowForm}
                submitComment={this.props.submitComment}
              />}
          </div>
        )}
      </AuthUserContext.Consumer>
    )

  }
}

export default CommentListHeader
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
          <React.Fragment>
          <div className='px-2 pt-3 pb-2 mx-1'>
            {authUser &&
              <TextButton onClick={this.toggleShowForm} text='[ Comment ]' />}
              <div className='mb-1'></div>
            {this.state.showForm &&
              <CommentReplyForm
                toggleShowForm={this.toggleShowForm}
                submitComment={this.props.submitComment}
              />}
          </div>
          <div className='h-3 bg-body-background w-full'></div>
          </React.Fragment>
        )}
      </AuthUserContext.Consumer>
      
    )

  }
}

export default CommentListHeader
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
          <div className='px-3 pt-3 pb-2 mx-1'>
            {authUser &&
              <span className='pl-1'>
              <TextButton onClick={this.toggleShowForm} text='[ Comment ]' color='text-light-gray'/></span>}
            {this.state.showForm &&
              <CommentReplyForm
                toggleShowForm={this.toggleShowForm}
                submitComment={this.props.submitComment}
              />}
          </div>
          </React.Fragment>
        )}
      </AuthUserContext.Consumer>
      
    )

  }
}

export default CommentListHeader
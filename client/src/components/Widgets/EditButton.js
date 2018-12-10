import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthUserContext from '../AuthUserSession/AuthUserContext';

export const EditButton = props => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        authUser && (authUser.dbUser._id === props.authorId) &&
        <Link to={{ pathname: `/posts/${props.postId}/edit` }} style={{color: '#FFF'}}>
        <span className='font-normal text-sm'>{props.text}  </span>
          <i className="fas fa-pencil-alt text-light-gray text-sm">
          </i>
        </Link>
      )}
    </AuthUserContext.Consumer>
  )
};

{/* <i className="far fa-edit text-brand-green text-sm">
<span className='font-normal text-base'>  {props.text}</span> */}

EditButton.propTypes = {
  authorId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  text: PropTypes.string
}

export default EditButton
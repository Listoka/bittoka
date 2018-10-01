import React from 'react'
import { auth } from '../../firebase';

const clickHandler = (event) => {
  event.preventDefault()
  auth.doSignOut()
}

const SignOut = (props) => {
  return (
    <a  href='/signout' onClick={clickHandler}>Sign Out</a>
  )
}

export default SignOut
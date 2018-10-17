import React from 'react'
import { withRouter } from 'react-router-dom'
import { firebase, auth } from '../../firebase'
import axios from 'axios'
import * as routes from '../../constants/routes'
import './Join.css'

class Join extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: '',
    }
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '' ||
      username === '' || email === ''

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={username}
          name='username'
          onChange={this.handleChange}
          type='text'
          placeholder='Name'
        />
        <input
          value={email}
          name='email'
          onChange={this.handleChange}
          type='email'
          placeholder='Email'
        />
        <input
          value={passwordOne}
          name='passwordOne'
          onChange={this.handleChange}
          type='password'
          placeholder='Password'
        />
        <input
          value={passwordTwo}
          name='passwordTwo'
          onChange={this.handleChange}
          type='password'
          placeholder='Confirm Password'
        />
        <button disabled={isInvalid} type='submit'>Sign Up</button>
        {error ? <p>Error: {error.message}</p> : null}
      </form>
    )
  }
}

export default withRouter(Join)

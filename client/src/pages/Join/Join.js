import React from 'react'
import { auth } from '../../firebase'
import axios from 'axios'
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

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { username, email, passwordOne } = this.state

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // *****
        // this is where we also send the new user data to mongo
        // *****
        console.log(authUser)
        return axios({
          url: '/api/users',
          method: 'post',
          data: {
            username: username,
            uid: authUser.user.uid,
            email: email,
          }
        })

      })
      .then(response => console.log(response))
      .catch(error => {
        this.setState({ error })
      })
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
        { error ? <p>Error: {error}</p> : null }
      </form>
    )
  }
}

export default Join;

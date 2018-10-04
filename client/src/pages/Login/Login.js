import React from 'react'
import { withRouter } from 'react-router-dom'
import { auth } from '../../firebase'
import * as routes from '../../constants/routes'
import './Login.css'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: null
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    const { email, password } = this.state
    event.preventDefault()

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(this.props.history.push(routes.ACCOUNT))
      .catch(error => {
        console.log(error)
        this.setState({ error })
      })
  }

  render() {
    const { email, password } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name='email'
          placeholder='email'
          value={email}
          onChange={this.handleChange}
          type='email'
        />
        <input
          name='password'
          placeholder='password'
          value={password}
          onChange={this.handleChange}
          type='password'
        />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

export default withRouter(Login)

import React from 'react';
import { firebase, auth } from '../../firebase'
import axios from 'axios'

import ModalWrapper from './ModalWrapper';

class JoinModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: null
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value, error: null })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { username, email, passwordOne } = this.state

    axios.get('/api/users/username/' + username)
      .then(response => {
        console.log('join reponse', response)
        if (response.data) {
          throw new Error('Username is already taken')
        }
        return auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      })
      .then(authUser => {
        let token = firebase.auth.currentUser.getIdToken()
        return Promise.all([authUser, token])
      })
      .then(([authUser, authToken]) => {
        console.log(authUser)
        return axios({
          url: '/api/users',
          method: 'post',
          data: {
            username: username,
            uid: authUser.user.uid,
            email: email,
          },
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        })
      })
      .then(response => console.log(response))
      .then(() => this.props.closeModal())
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {

    const { username, email, passwordOne, passwordTwo, error } = this.state
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '' ||
      username === '' || email === '' || error

    return (
      <ModalWrapper
        {...this.props}
        width={400}
        showOk={false}
      >
        <div className="Container">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <div className="DescriptionBox">
                <h2 className="join-header">Join Listoka!</h2>
                <div className="join-body">
                  <div className='row'>
                    <div className="col-sm-8">
                      <form onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                          <label htmlFor='username'>Username:</label>
                          <input
                            value={username}
                            name='username'
                            onChange={this.handleChange}
                            type='text'
                            className='form-control'
                            placeholder='Name'
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='email'>Email:</label>
                          <input
                            value={email}
                            name='email'
                            onChange={this.handleChange}
                            type='email'
                            className='form-control'
                            placeholder='Email'
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='passwordOne'>Password:</label>
                          <input
                            value={passwordOne}
                            name='passwordOne'
                            onChange={this.handleChange}
                            type='password'
                            className='form-control'
                            placeholder='Password'
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='passwordTwo'>Confirm Password:</label>
                          <input
                            value={passwordTwo}
                            name='passwordTwo'
                            onChange={this.handleChange}
                            type='password'
                            className='form-control'
                            placeholder='Confirm Password'
                          />
                        </div>
                        <button disabled={isInvalid} type='submit' className='btn btn-success'>Sign Up</button>
                        {error ? <p>Error: {error.message}</p> : null}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>
      </ModalWrapper>
    )
  }
}
export default JoinModal;
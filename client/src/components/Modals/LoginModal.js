import React from 'react';
import { auth } from '../../firebase'

import ModalWrapper from './ModalWrapper';

class LoginModal extends React.Component {
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
      .then(() => this.props.closeModal())
      .catch(error => {
        console.log(error)
        this.setState({ error })
      })
  }

  render() {

    const { email, password, error } = this.state

    return (
      <ModalWrapper
        width={400}
        showOk={false}
        {...this.props}
      >
        <div className="Container"></div>
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <div className="DescriptionBox">
              <h2 className="join-header">Login</h2>
              <div className="join-body">
                <div className='row'>
                  <div className="col-sm-8">
                    <form onSubmit={this.handleSubmit}>
                      <div className='form-group'>
                        <label htmlFor='username'>Email:</label>
                        <input
                          name='email'
                          placeholder='email'
                          value={email}
                          onChange={this.handleChange}
                          className='form-control'
                          type='email'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <input
                          name='password'
                          placeholder='password'
                          value={password}
                          onChange={this.handleChange}
                          className='form-control'
                          type='password'
                        />
                      </div>
                      <button type='submit' className='btn btn-success'>Submit</button>
                      { error ? <p>{error.message}</p> : null }
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
        {/* </div> */}
      </ModalWrapper >
    )

  }
}

export default LoginModal;
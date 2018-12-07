import React from 'react';
import { auth } from '../../firebase'
import ModalWrapper from './ModalWrapper';
import { B } from '../Widgets';

class LoginModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: null,
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
        showOk={false}
        width={'w-2/5'}
        {...this.props}
      >
        <div className="text-white font-header text-2xl text-center">Login</div>
        <hr className="border-brand-green border-2 hrModals"></hr>

            <form onSubmit={this.handleSubmit}>
              <div className='text-base font-body text-white'>
                <label htmlFor='username'>Email</label>
                <div className='-ml-2 mr-2'>
                <input
                  name='email'
                  placeholder='your@email.com'
                  value={email}
                  onChange={this.handleChange}
                  className='bg-medium-gray ml-2 outline-none focus:border-white focus:border mt-2 w-full'
                  type='email'
                />
                </div>
              </div>
              <div className='text-base font-body text-white'>
                <label htmlFor='password'>Password</label>
                <div className='-ml-2 mr-2'>
                <input
                  name='password'
                  placeholder='Password'
                  value={password}
                  onChange={this.handleChange}
                  className='bg-medium-gray ml-2 outline-none focus:border-white focus:border mt-2 w-full'
                  type='password'
                />
                </div>
              </div>
              <B btnType={'primary'}>Submit</B>
              {/* <Button className='btn btn-nav btn-nav:hover btn-nav:active outline-none ml-0' text={'Submit'}></Button> */}
              {error ? <p>{error.message}</p> : null}
            </form>

      </ModalWrapper >
    )

  }
}

export default LoginModal;
import React from 'react';
import { firebase, auth } from '../../firebase'
import axios from 'axios'
import { Row } from '../Widgets';

import ModalWrapper from './ModalWrapper';

class JoinModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            moneyBtnId: '',
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
        const { username, email, passwordOne, moneyBtnId } = this.state

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
                        moneyBtnId: moneyBtnId
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

        const { username, email, passwordOne, passwordTwo, error, moneyBtnId } = this.state
        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '' ||
            username === '' || email === '' || error

        return (
            <ModalWrapper
                {...this.props}
                // width={400}
                showOk={false}
            >

                <h2 className="header">Join Listoka</h2>
                <hr className="hrModals"></hr>
                <Row>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <label className='modal-label' htmlFor='username'>Username:</label>
                                <input
                                    value={username}
                                    name='username'
                                    onChange={this.handleChange}
                                    type='text'
                                    className='form-control join-control'
                                    placeholder='Name'
                                />
                            </div>
                            <div className='form-group'>
                                <label className='modal-label' htmlFor='email'>Email:</label>
                                <input
                                    value={email}
                                    name='email'
                                    onChange={this.handleChange}
                                    type='email'
                                    className='form-control join-control'
                                    placeholder='Email'
                                />
                            </div>
                            <div className='form-group'>
                                <label className='modal-label' htmlFor='moneyBtnId'>MoneyButton User Number:</label>
                                <input
                                    value={moneyBtnId}
                                    name='moneyBtnId'
                                    onChange={this.handleChange}
                                    type='moneyBtnId'
                                    className='form-control join-control'
                                    placeholder='Example: 1111'
                                />
                                <div className='getMoneyBtnId '> No MoneyButton account? Click <a href="https://www.moneybutton.com/register" target="_blank" rel="noopener noreferrer">here</a>. <br></br></div>

                            </div>
                            <div className='form-group'>
                                <label className='modal-label' htmlFor='passwordOne'>Password:</label>
                                <input
                                    value={passwordOne}
                                    name='passwordOne'
                                    onChange={this.handleChange}
                                    type='password'
                                    className='form-control join-control'
                                    placeholder='Password'
                                />
                            </div>
                            <div className='form-group'>
                                <label className='modal-label' htmlFor='passwordTwo'>Confirm Password:</label>
                                <input
                                    value={passwordTwo}
                                    name='passwordTwo'
                                    onChange={this.handleChange}
                                    type='password'
                                    className='form-control join-control'
                                    placeholder='Confirm Password'
                                />
                            </div>
                            <button disabled={isInvalid} type='submit' className='modalButton'>Sign Up</button>
                            {error ? <p>Error: {error.message}</p> : null}
                        </form>
                    </div>
                    <div className="col-sm-1"></div>
                </Row>



            </ModalWrapper>
        )
    }
}
export default JoinModal;
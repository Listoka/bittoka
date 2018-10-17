import React from 'react';

import ModalWrapper from './ModalWrapper';

const JoinModal = props => {
    return (
        <ModalWrapper
            {...props}
            // width={400}
            className='modals2-3'
            showOk={false}
        >

            <h2 className="header">Join Listoka!</h2>
<hr></hr>
            <div className='row'>
                <div className='col-sm-1'></div>
                <div className="col-sm-10">
                    <form /*onSubmit={this.handleSubmit}*/>
                        <div className='form-group'>
                            <label for='username'>Username:</label>
                            <input
                                // value={username}
                                name='username'
                                // onChange={this.handleChange}
                                type='text'
                                className='form-control'
                                placeholder='Name'
                            />
                        </div>
                        <div className='form-group'>
                            <label for='email'>Email:</label>
                            <input
                                // value={email}
                                name='email'
                                // onChange={this.handleChange}
                                type='email'
                                className='form-control'
                                placeholder='Email'
                            />
                        </div>
                        <div className='form-group'>
                            <label for='passwordOne'>Password:</label>
                            <input
                                // value={passwordOne}
                                name='passwordOne'
                                // onChange={this.handleChange}
                                type='password'
                                className='form-control'
                                placeholder='Password'
                            />
                        </div>
                        <div className='form-group'>
                            <label for='passwordTwo'>Confirm Password:</label>
                            <input
                                // value={passwordTwo}
                                name='passwordTwo'
                                // onChange={this.handleChange}
                                type='password'
                                className='form-control'
                                placeholder='Confirm Password'
                            />
                        </div>
                        <button /*disabled={isInvalid}*/ type='submit' className='button'>Sign Up</button>
                        {/* {error ? <p>Error: {error.message}</p> : null} */}
                    </form>
                </div>
                <div className='col-sm-1'></div>
            </div>

        </ModalWrapper>
    )
}
export default JoinModal;
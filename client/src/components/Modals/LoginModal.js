import React from 'react';

import ModalWrapper from './ModalWrapper';

const LoginModal = props => {
    return (
        <ModalWrapper
            {...props}
            // width={400}
            className='modals2-3'
            showOk={false}
        >

            <h2 className="header">Login</h2>
            <hr></hr>
            <div className='row'>
                <div className='col-sm-2'></div>
                <div className="col-sm-8">

                    <form /*onSubmit={this.handleSubmit}*/>
                        <div className='form-group'>
                            <label for='username'>Email:</label>
                            <input
                                name='email'
                                placeholder='email'
                                // value={email}
                                // onChange={this.handleChange}
                                className='form-control'
                                type='email'
                            />
                        </div>
                        <div className='form-group'>
                            <label for='password'>Password:</label>
                            <input
                                name='password'
                                placeholder='password'
                                // value={password}
                                // onChange={this.handleChange}
                                className='form-control'
                                type='password'
                            />
                        </div>
                        <button type='submit' className='button'>Submit</button>
                        {/* {
                    error
                        ? <p>{error.message}</p>
                        : null
                } */}
                    </form>
                </div>
                <div className='col-sm-2'></div>
            </div>



        </ModalWrapper >
    )
}

export default LoginModal;
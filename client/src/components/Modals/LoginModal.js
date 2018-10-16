import React from 'react';

import ModalWrapper from './ModalWrapper';

const LoginModal = props => {
    return (
        <ModalWrapper
            {...props}
            width={400}
            showOk={false}
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
                                        <button type='submit' className='btn btn-success'>Submit</button>
                                        {/* {
                    error
                        ? <p>{error.message}</p>
                        : null
                } */}
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

export default LoginModal;
import React from 'react';

import ModalWrapper from './GistModalWrapper';


const GistModal = props => {

    return (
        <ModalWrapper
            {...props}
            // title="Listoka's Gist"
            // width={75}
            className='modal-gist'
            showOk={false}
        >
            <h2 className="header">Listoka's Gist</h2>
            <hr className="hrModals"></hr>
            <div className='row'>
                <div className="col-lg-7">
                    <p className='gist'>Listoka is a writing and entertainment based platform where 
                    users will also be able to find and contribute to information that benefits people's lives. 
                    It will be similar to Reddit in the sense that users can create their own content, 
                    leave feedback, and follow their favorite content creators. What sets Listoka apart is carefully 
                    cultivated content and Bitcoin tip integration. That is, contributors will make money for their 
                    contributions and the higher the quality of their content, the more they're likely to earn. Listoka 
                    aims to be a useful, fun, money-making platform that becomes the gateway to Bitcoin for the average, 
                    everyday person.</p>
                </div>
                <div className="col-lg-5">
                    <img className="gistImg img-fluid" src="/images/gistImg.jpg" alt="Young people working"></img>
                </div>
            </div>
        </ModalWrapper >
    )
}

export default GistModal
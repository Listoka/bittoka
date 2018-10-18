import React from 'react';

import ModalWrapper from './ModalWrapper';


const GistModal = props => {

    return (
        <ModalWrapper
            {...props}
            // title="Listoka's Gist"

            showOk={false}
        >
            {/* <div className="gistContainer">
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <div className="gistDescriptionBox"> */}
            {/* <i onClick={props.closeModal} className="fas fa-window-close"></i> */}
            <h2 className="gist-header">Listoka's Gist</h2>
            <hr></hr>
            {/* <div className="gist-body">*/}
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
                    <img className="gistImg img-fluid" src="./images/gistImg.jpg" alt="Young people working"></img>
                </div>
            </div>
            {/*</div>
                        </div>
                    </div>
                    <div className="col-sm-2"></div>
                </div> */}
            {/* </div> */}
        </ModalWrapper >
    )
}

export default GistModal
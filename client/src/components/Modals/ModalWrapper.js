import React from 'react';

const ModalWrapper = props => {
    const handleBackgroundClick = e => {
      if (e.target === e.currentTarget) props.closeModal();
    };
  
    const onOk = () => {
      props.onOk();
      props.closeModal();
    };
  
    const okButton = props.showOk
      ? (
        <button
          onClick={onOk}
          disabled={props.okDisabled}
        >
          {props.okText}
        </button>
      ) : null;

      return (
        <React.Fragment>
        <div id="overlay"></div>
        <div className={`${props.width} modalTop border-2 border-white border-solid bg-body-background ml-auto mr-auto p-4 pin-x absolute rounded-lg shadow-lg mt-32 z-10 mb-3`} onClick={handleBackgroundClick}>
          <div>
            <h1>{props.title}</h1><i onClick={props.closeModal} className="fas fa-times float-right cursor-pointer text-white"></i>
          </div>
          {props.children}
          {okButton}
        </div>
        </React.Fragment>
      );
    };
    
    
    export default ModalWrapper;
// .Modal, .GistModal {
//   background: white;
//   /* margin:auto; */
//   margin-left: auto;
//   margin-right: auto;
//   /* margin-top: -60px; */
//   padding: 20px;
//   z-index: 3;
//   position: absolute;
//   top: 100px;
//   left:0;
//   right: 0;
//   border-radius: 10px;
//   /* border-radius: 2px; */
//   box-shadow: 0 6px 10px 0px #333; 
// }

// .Modal {   
//   width:40%;

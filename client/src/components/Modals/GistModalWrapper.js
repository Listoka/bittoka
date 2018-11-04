import React from 'react';

const GistModalWrapper = props => {
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
        <div>
        <div id="overlay"></div>
        <div className='GistModal' onClick={handleBackgroundClick}>
          <header>
            <h1>{props.title}</h1> <i onClick={props.closeModal} className="fas fa-window-close close"></i>
          </header>
    
          {props.children}
          {okButton}
        </div>
        </div>
      );
    };
    
    
    export default GistModalWrapper;
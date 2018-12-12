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
      <div>
      <div id="overlay"></div>
      <div className={`${props.width} modalTop bg-body-background ml-auto mr-auto p-4 border border-mack-the-knife pin-x absolute rounded-lg shadow-lg mt-32 z-10 mb-3`} onClick={handleBackgroundClick}>
        <div>
          <h1>{props.title}</h1><i onClick={props.closeModal} className="fas fa-times float-right cursor-pointer text-light-gray"></i>
        </div>
        {props.children}
        {okButton}
      </div>
      </div>
    </React.Fragment>
  );
};


export default ModalWrapper;

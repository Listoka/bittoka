import React from 'react';

import GistModal from './GistModal';
import JoinModal from './JoinModal';
import LoginModal from './LoginModal';

const ModalConductor = props => {
    switch (props.currentModal) {
        case 'GIST':
            return <GistModal {...props}/>;
        case 'JOIN':
            return <JoinModal {...props}/>;
        case 'LOGIN': 
            return <LoginModal {...props}/>
        default:
            return null;

    }
}

export default ModalConductor;
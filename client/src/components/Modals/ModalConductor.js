import React from 'react';

import GistModal from './GistModal';
import JoinModal from './JoinModal';
import LoginModal from './LoginModal';
import PublishPostModal from './PublishPostModal';

const ModalConductor = props => {
  switch (props.currentModal) {
    case 'GIST':
      return <GistModal {...props} className='modal-gist' />;

    case 'JOIN':
      return <JoinModal {...props} className='' />;

    case 'LOGIN':
      return <LoginModal {...props} />

    case 'PUBLISH-POST':
      return <PublishPostModal {...props} />

    default:
      return null;
  }
}

export default ModalConductor;
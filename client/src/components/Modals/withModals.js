import React from 'react'
import ModalLaunchContext from './ModalLaunchContext';
import ModalConductor from './ModalConductor';

const withModals = Component =>
  class WithModals extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        activeModal: null
      }
    }

    openModal = (e, modalName) => {
      e.preventDefault()
      this.setState({ activeModal: modalName })
    }

    closeModal = () => this.setState({ activeModal: '' })

    render() {
      return (
        <ModalLaunchContext.Provider value={this.openModal}>
          <Component {...this.props} />
          <ModalConductor
            currentModal={this.state.activeModal}
            closeModal={this.closeModal}
          />
        </ModalLaunchContext.Provider>
      )
    }
  }

export default withModals
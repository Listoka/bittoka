import React, { Component } from 'react';
// import './styles.css';

export default class VideoAdd extends Component {
  // Start the popover closed
  state = {
    url: '',
    open: false,
  };

  // When the popover is open and users click anywhere on the page,
  // the popover should close
  componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }

  // Note: make sure whenever a click happens within the popover it is not closed
  onPopoverClick = () => {
    this.preventNextClose = true;
  };

  openPopover = () => {
    if (!this.state.open) {
      this.preventNextClose = true;
      this.setState({
        open: true,
      });
    }
  };

  closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({
        open: false,
      });
    }

    this.preventNextClose = false;
  };

  addVideo = () => {
    const { editorState, onChange } = this.props;
    onChange(this.props.modifier(editorState, { src: this.state.url }));
  };

  changeUrl = (evt) => {
    this.setState({ url: evt.target.value });
  };

  render() {
    const popoverClassName = this.state.open ?
      'addVideoPopover' :
      'addVideoClosedPopover';
    const buttonClassName = this.state.open ?
      'addVideoPressedButton' :
      'addVideoButton';

    return (
      <div className='addVideo' >
        <button
          className={buttonClassName}
          onMouseUp={this.openPopover}
          type="button"
        >
          Vid
        </button>
        <div
          className={popoverClassName}
          onClick={this.onPopoverClick}
        >
          <input
            type="text"
            placeholder="Paste the video url …"
            className='addVideoInput'
            onChange={this.changeUrl}
            value={this.state.url}
          />
          <button
            className='addVideoConfirmButton'
            type="button"
            onClick={this.addVideo}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

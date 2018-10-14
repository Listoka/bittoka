import React from 'react';
import './Stickybar.css';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

/* React Tooltip Documentation https://www.npmjs.com/package/react-tooltip */

const Stickybar = props => (

  <div className="icon-bar">
  <Link className='facebook' to={{pathname:'/createpost', state:{categoryName: props.categoryName}}} data-tip data-for="createPost" data-offset="{'left': 15}"><i className="fas fa-pen-square"></i></Link>
  <ReactTooltip id='createPost' place="left" type="dark" effect="solid" >
   Create a post
  </ReactTooltip>
  {/* TODO: placeholders, not sure what we want to link to from here, but the page needed some color*/}
  <a href="#" data-tip data-for='twitterToolTip'  data-offset="{'left': 15}" className="twitter"><i className="fab fa-twitter"></i></a> 
  <ReactTooltip id='twitterToolTip' place="left" type="dark" effect="solid">
    Follow us on Twitter
  </ReactTooltip>
  <a href="#" data-tip data-for='googleToolTip' data-offset="{'left': 15}" className="google"><i className="fab fa-google"></i></a> 
  <ReactTooltip id='googleToolTip' place="left" type="dark" effect="solid">
    Google, if you must
  </ReactTooltip>
  <a href="#" data-tip data-for='linkedInToolTip' data-offset="{'left': 15}" className="linkedin"><i className="fab fa-linkedin"></i></a>
  <ReactTooltip id='linkedInToolTip' place="left" type="dark" effect="solid">
    Get a job ya hippie!
  </ReactTooltip>
  <a href="#" data-tip data-for='youtubeTooltip' data-offset="{'left': 15}" className="youtube"><i className="fab fa-youtube"></i></a> 
  <ReactTooltip className="tooltip" id='youtubeTooltip' place="left" type="dark" effect="solid">
    Cheap Netflix
  </ReactTooltip>

</div>
);

export default Stickybar;

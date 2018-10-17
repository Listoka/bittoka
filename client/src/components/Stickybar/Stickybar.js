import React from 'react';
import './Stickybar.css';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import AuthUserContext from '../AuthUserSession/AuthUserContext'

/* React Tooltip Documentation https://www.npmjs.com/package/react-tooltip */

const Stickybar = props => (

  <div className="icon-bar">
    <AuthUserContext.Consumer>
      {
        authUser => {
          return props.categoryName && authUser
            ? (
              <React.Fragment>
                <Link className='facebook' to={{ pathname: `/categories/${props.categoryName}/posts/new` }} data-tip data-for="createPost" data-offset="{'left': 15}"><i className="fas fa-pen-square"></i></Link>
                <ReactTooltip id='createPost' place="left" type="dark" effect="solid" > Create a post </ReactTooltip>
              </React.Fragment>
            )
            : null
        }
      }
    </AuthUserContext.Consumer>
    {/* TODO: placeholders, not sure what we want to link to from here, but the page needed some color*/}
    <a href="https://twitter.com/popmotionjs?lang=en" data-tip data-for='twitterToolTip' data-offset="{'left': 15}" className="twitter"><i className="fab fa-twitter"></i></a>
    <ReactTooltip id='twitterToolTip' place="left" type="dark" effect="solid">
      Follow us on Twitter
  </ReactTooltip>
    <a href="https://www.google.com/search?q=bitcoin&oq=bitcoin&aqs=chrome..69i57j0j69i60l2j0l2.5688j0j4&sourceid=chrome&ie=UTF-8" data-tip data-for='googleToolTip' data-offset="{'left': 15}" className="google"><i className="fab fa-google"></i></a>
    <ReactTooltip id='googleToolTip' place="left" type="dark" effect="solid">
      Google, if you must
  </ReactTooltip>
    <a href="https://www.linkedin.com/feed/" data-tip data-for='linkedInToolTip' data-offset="{'left': 15}" className="linkedin"><i className="fab fa-linkedin"></i></a>
    <ReactTooltip id='linkedInToolTip' place="left" type="dark" effect="solid">
      Get a job ya hippie!
  </ReactTooltip>
    <a href="https://youtu.be/o0u4M6vppCI" data-tip data-for='youtubeTooltip' data-offset="{'left': 15}" className="youtube"><i className="fab fa-youtube"></i></a>
    <ReactTooltip className="tooltip" id='youtubeTooltip' place="left" type="dark" effect="solid">
      Cheap Netflix
  </ReactTooltip>

  </div>
);

export default Stickybar;

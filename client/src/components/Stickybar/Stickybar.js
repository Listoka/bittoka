import React from 'react';
import './Stickybar.css';
import { Link } from 'react-router-dom';

const Stickybar = props => (

  <div class="icon-bar">
  <a href= {<Link style={{ color: 'snow', textDecoration: 'none' }} to={{pathname:'/createpost', state:{categoryName: props.categoryName}}}>Create Post</Link>} class="facebook"><i class="fas fa-pen-square"></i></a> 
  <a href="#" class="twitter"><i class="fab fa-twitter"></i></a> 
  <a href="#" class="google"><i class="fab fa-google"></i></a> 
  <a href="#" class="linkedin"><i class="fab fa-linkedin"></i></a>
  <a href="#" class="youtube"><i class="fab fa-youtube"></i></a> 
</div>
);

export default Stickybar;

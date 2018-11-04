import React from "react";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export const NestedComments = (props) => {
    
    return (
        <React.Fragment>
            <div className="subComment rounded">
                <hr />
                <p>Subcomments</p>
                <p className='smallPostCommentText'>
                  <Link to={{ pathname: `/users/${props.author}` }}>{props.authorName}</Link>
                  <span className='mr-2'></span>
                    <i className="fas fa-calendar-alt"></i><span className='mr-1'></span>
                    <Moment fromNow>{props.createdAt}</Moment>
                  <span className='mr-2'></span>
                  <i className="fab fa-bitcoin"></i><span className='mr-1'></span>
                  [earned $x.xx]
                </p>
                <br></br>
                <p className='mediumPostText'> {props.body}</p>
            </div>
        </React.Fragment>
    );
};
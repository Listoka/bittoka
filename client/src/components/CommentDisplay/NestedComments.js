import React from "react";
import './NestedComments.css';
import Moment from 'react-moment';

export const NestedComments = (props) => {
    const createdDate = props.createdAt && props.createdAt.slice(0, 10)
    return (
        <React.Fragment>
            <div className="subComment rounded">
                <hr />
                <p>Subcomments</p>
                <p className='smallPostCommentText'>{this.props.authorName}&nbsp;&nbsp;<i className="fas fa-calendar-alt"></i>&nbsp;&nbsp;<Moment fromNow>{this.props.createdAt}</Moment>&nbsp;&nbsp;<i className="fab fa-bitcoin"></i>&nbsp;&nbsp;[earned $x.xx]</p>
                <br></br>
                <p className='mediumPostText'> {this.props.body}</p>
            </div>
        </React.Fragment>
    );
};
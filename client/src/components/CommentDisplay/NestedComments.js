import React from "react";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { BitcoinIcon, CalendarIcon, CommentContainer } from '../Widgets';

export const NestedComments = (props) => {
    
    return (
        <React.Fragment>
            <CommentContainer styles={''}>
                <p className='text-sm mb-2'>
                  <Link className='mr-2' to={{ pathname: `/users/${props.author}` }}>{props.authorName}</Link>
                    <CalendarIcon/>
                    <Moment className='mr-2' fromNow>{props.createdAt}</Moment>
                  <BitcoinIcon/>
                  [earned $x.xx]
                </p>
                <p className='text-sm'> {props.body}</p>
            </CommentContainer>
        </React.Fragment>
    );
};
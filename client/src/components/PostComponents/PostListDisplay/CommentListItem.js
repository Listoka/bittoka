import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { CommentContainer, BitcoinIcon } from '../../Widgets/';

export const CommentListItem = props => {
    return (
        <React.Fragment>
            {console.log(props)}
            <CommentContainer styles={''}>
                <p className='text-sm mb-2'>
                <BitcoinIcon/>
                  [$x.xx]
                  <Link className='mr-1' to={{ pathname: `/users/${props.author}` }}> {props.authorName}</Link> 
                  commented on TITLE {}
                    <Moment className='mr-2' fromNow>{props.createdAt}</Moment>
                </p>
                <p className='text-sm'> {props.body}</p>
            </CommentContainer>
            <hr/>
        </React.Fragment>
    );
};
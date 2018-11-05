import React from "react";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Paragraph, BitcoinIcon, CalendarIcon, CommentContainer } from '../Widgets';

export const NestedComments = (props) => {
    
    return (
        <React.Fragment>
            <CommentContainer styles={''}>
                <Paragraph styles={'text-sm mb-2'}>
                  <Link to={{ pathname: `/users/${props.author}` }}>{props.authorName}</Link>
                  <span className='mr-2'></span>
                    <CalendarIcon/><span className='mr-1'></span>
                    <Moment fromNow>{props.createdAt}</Moment>
                  <span className='mr-2'></span>
                  <BitcoinIcon/><span className='mr-1'></span>
                  [earned $x.xx]
                </Paragraph>
                <Paragraph styles={'text-sm'}> {props.body}</Paragraph>
            </CommentContainer>
        </React.Fragment>
    );
};
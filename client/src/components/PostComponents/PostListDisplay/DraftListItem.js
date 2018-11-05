import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { EditButton, DeleteIcon, Paragraph } from '../../Widgets';

export const DraftListItem = props => {
    return (
        <React.Fragment>
            <Paragraph styles={'font-normal mb-1 text-base font-bold'}>Title: {props.title}</Paragraph>
            <Paragraph styles={'font-normal mb-1 text-sm'}><strong>Updated: </strong> 
              <Moment fromNow>{props.updatedAt}</Moment> in 
              <Link to={`/categories/${props.categoryName}`}>
                <span className={`${props.categoryName}Flair flair`}>{props.categoryName}</span>
              </Link>
            </Paragraph>
            <br></br>
            <Paragraph styles={'mb-8'}>
              <span className="float-right">
                <Link to={{ pathname: `/posts/${props.postId}/edit` }}>
                  <EditButton text='Edit Post'/>
                </Link>
                <span className='pl-3'></span>|<span className='pr-3'></span>
                <a onClick={(event) => props.removeDraft(event, props.index, props.postId)}>
                  <DeleteIcon text='Delete'/>
                </a>
              </span>
            </Paragraph>
            <hr/>
        </React.Fragment>
    );
};
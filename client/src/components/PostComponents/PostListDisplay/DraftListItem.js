import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { EditButton, DeleteIcon } from '../../Widgets';

export const DraftListItem = props => {
    return (
        <React.Fragment>
            <p className='font-normal mb-1 text-base font-bold'>Title: {props.title}</p>
            <p className='font-normal mb-1 text-sm'><strong>Updated: </strong> 
              <Moment fromNow>{props.updatedAt}</Moment> in <Link to={`/categories/${props.categoryName}`}>
                <span className={`${props.categoryName}Flair flair`}> {props.categoryName}</span>
              </Link>
            </p>
            <br></br>
            <p className='mb-8'>
              <span className="float-right">
                <Link className='mr-2' to={{ pathname: `/posts/${props.postId}/edit` }}>
                  <EditButton text='Edit Post'/>
                </Link>
                  |
                <a className='ml-2' onClick={(event) => props.removeDraft(event, props.index, props.postId)}>
                  <DeleteIcon text='Delete'/>
                </a>
              </span>
            </p>
            <hr/>
        </React.Fragment>
    );
};
import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';


export const DraftListItem = props => {
    return (
        <React.Fragment>
            <p className='draftTitle'>Title: {props.title}</p>
            <p className='draftDate'><strong>Updated: </strong><Moment fromNow>{props.updatedAt}</Moment> in <Link to={`/categories/${props.categoryName}`}><span className={`${props.categoryName}Flair flair`}>{props.categoryName}</span></Link></p>
            <br></br>
            <p >
                <span className="edit-btn-float-right">
                    <Link to={{ pathname: `/posts/${props.postId}/edit` }}>
                        <i className="far fa-edit"> Edit Post</i>
                    </Link>
                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    <a className='draftButtons' onClick={(event) => props.removeDraft(event, props.index, props.postId)}><i className="fas fa-trash-alt"></i> Delete</a>
                </span>
            </p>
            <br></br>
            <hr></hr>
        </React.Fragment>
    );
};
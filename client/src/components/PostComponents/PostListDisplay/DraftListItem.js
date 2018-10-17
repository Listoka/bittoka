import React from 'react';
import { Link } from 'react-router-dom';

export const DraftListItem = props => {
    return (
        <React.Fragment>
            <p>Title: {props.title} | Category: {props.categoryName} | Updated: {props.updatedAt}
                <span className="edit-btn-float-right">
                        <Link to={{ pathname: `/posts/${props.postId}/edit` }}>
                            <i className="far fa-edit"> Edit Post</i>
                        </Link>
                </span>
            </p>
            <a className="btn" onClick={(event) => props.removeDraft(event, props.index, props.postId)}><i className="fas fa-trash-alt"></i> Delete</a>
            <hr/>
        </React.Fragment>
    );
};
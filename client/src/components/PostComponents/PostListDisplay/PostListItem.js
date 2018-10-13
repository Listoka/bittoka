import React from 'react';
import { Link } from 'react-router-dom';
import './postListItem.css';
import AuthUserContext from '../../AuthUserSession/AuthUserContext'

export const PostListItem = props => {
    return (
        <div className='card listItem' id={props._id}>
            <div className="card-body">
                <h4 className='card-title'><Link to={{ pathname: `/posts/${props._id}` }}>{props.title}</Link></h4>
                <AuthUserContext.Consumer>
                    {
                        authUser => {
                            if (authUser && authUser.dbUser._id === props.author) {
                                return (
                                    // TODO: Fix formatting stuff here
                                    <span className="delete-btn" onClick={(event) => props.handleDeleteButton(event, props._id)}>
                                        <i class="far fa-trash-alt"></i>
                                        &nbsp;&nbsp; | &nbsp;&nbsp;
                                    <Link
                                            to={{ pathname: `/posts/${props._id}/edit` }}>
                                            <i className="far fa-edit"> Edit Post</i>
                                        </Link>
                                    </span>
                                )
                            } else {
                                return null
                            }
                        }
                    }
                </AuthUserContext.Consumer>
                <br />
                <h6 className='card-subtitle'>Posted by: {props.authorName}</h6>
                <p className='card-text'>{props.body}</p>
            </div>
        </div>
    );
};